const express = require("express");
const { register, login,uploadAvatar,editProfile,getAllUser, getInforUser } = require("../controllers/user.controller");
const {authenticate} = require("../middlewares/auth/authenticate")
const {
  checkExistByUserName,
  checkPassword,
  checkSameUserName
} = require("../middlewares/validations/checkExist");
const { uploadImage } = require("../middlewares/upload/uploadImg");
const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.get("/:id",authenticate,getInforUser);

userRouter.post("/register",checkSameUserName, register);
userRouter.post("/login", checkExistByUserName, checkPassword, login);

userRouter.put("/upload-avatar",authenticate,uploadImage("avatar") ,uploadAvatar);
userRouter.put("/:id",authenticate,editProfile)


module.exports = userRouter;

// https://blockchain-api-ab1c.onrender.com/api/v1