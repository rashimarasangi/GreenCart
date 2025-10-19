import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "No token available" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      const user = await User.findById(tokenDecode.id).select("-password");
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};
export default authUser;
