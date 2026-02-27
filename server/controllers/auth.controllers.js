import User from '../models/user.model.js'
import genToken from '../config/token.js';

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `Internal server error ${error}`,
      success: false
    });
  }
};


export const logout = async (req,res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({
      message: "logout successfully",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error ${error}`,
      success: false
    })
  }
}
