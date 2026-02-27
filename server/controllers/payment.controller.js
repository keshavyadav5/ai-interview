import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import stripe from "../services/stripe.service.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { planId, amount, credits } = req.body;

    if (!amount || !credits) {
      return res.status(400).json({ message: "Invalid plan data" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.userEmail,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Interview Credit Plan`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: req.userId,
        planId,
        credits,
      },
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    await Payment.create({
      userId: req.userId,
      planId,
      amount,
      credits,
      stripeSessionId: session.id,
      status: "created",
    });

    return res.json({ url: session.url });

  } catch (error) {
    return res.status(500).json({
      message: `Failed to create Stripe session ${error.message}`,
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const payment = await Payment.findOne({ stripeSessionId: session.id });

    if (!payment || payment.status === "paid") {
      return res.json({ received: true });
    }

    payment.status = "paid";
    payment.stripePaymentIntentId = session.payment_intent;
    await payment.save();

    await User.findByIdAndUpdate(payment.userId, {
      $inc: { credits: Number(payment.credits) },
    });
  }

  res.json({ received: true });
};