const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {signupUserVali,signinUserVali} = require('../validations/user')
const dotenv = require('dotenv');
dotenv.config();
const {SECRET_CODE} = process.env;
class UserController {

      // [GET] /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // [GET] /users/:id
  async getUserDetail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

    // [POST] /users
  async signUpUser(req, res) {
    try {
      const {email, password } = req.body;
      const {error} = signupUserVali.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          datas : [],
        })
      }
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({
          message: 'Email này đã tồn tại',
        });
      }
      const hashPassword = await bcryptjs.hash(password, 10);
      await User.create({
        ...req.body,
        password: hashPassword,
      });
      res.status(200).json({ message: 'Đăng kí tài khoản thành công' });
    } catch (error) {
      res.status(400).json({ message: "dang ki ko thanh cong"});
    }
  }

   // [POST] /users/login
  async signInUser(req, res) {
    try {
      const { role,email, password } = req.body;
      const {error} = signinUserVali.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          datas : [],
        })
      }
      const checkEmail = await User.findOne({ email });
      if (!checkEmail) {
        return res.status(404).json({
          message: 'Email không đúng',
        });
      }
      const checkPassword = await bcryptjs.compare(password, checkEmail.password);

      if (!checkPassword) {
        return res.status(400).json({
          message: 'Password không đúng',
        });
      }
      const token = jwt.sign({ id: checkEmail._id }, SECRET_CODE, {
        expiresIn: '1d',
      });
      checkEmail.password = undefined;
      res.json({
        message: 'Login thành công',
        datas: {...checkEmail.toObject(), accesstoken: token}
      });
    } catch (error) {
      res.status(400).json({ message: "Login ko thành công" });
    }
  }
   async updateUser(req, res){
       try {
        await User.updateOne({_id: req.params.id},req.body)
        res.status(200).json({ message: 'Update User Successful' });
      } catch (error) {
        res.status(400).json({ message: "update ko thanh cong" });
      }
    }

   // [DELETE] /users/:id
   async deleleUser(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Delete User Successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();