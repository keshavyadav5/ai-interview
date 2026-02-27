import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-white px-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center">

        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500 mt-4">
          Your payment has been processed successfully.
          Credits have been added to your account.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:opacity-90 transition"
        >
          Go to Home
        </button>

      </div>
    </div>
  );
}

export default PaymentSuccess;