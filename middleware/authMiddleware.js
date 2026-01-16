import User from "../db/UserModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token" });
    }
    const user = await User.findOne({ authToken: token });
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }

    req.user = user;
    
    next();
  } catch (error) {
    return res.status(500).json({
      msg: `Auth error => ${error}`,
    });
  }
};
