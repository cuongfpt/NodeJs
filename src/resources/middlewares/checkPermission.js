const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel');
dotenv.config();

const {SECRET_CODE} = process.env;
console.log(SECRET_CODE);

const checkPermission = async (req, res, next) => {
  try {
    // Bước 1: Kiểm tra xem headers có token hay không?
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        message: "Bạn chưa đăng nhập!",
      });
    }

    // Bước 2: Verify token để lấy user.
    const decoded = jwt.verify(token,SECRET_CODE);
    console.log(decoded);
    if (!decoded) {
      throw new Error("JWT Error:");
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        message: "User không tồn tại trong hệ thống!",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        message: "Bạn không có quyền làm việc này!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
module.exports = {checkPermission}