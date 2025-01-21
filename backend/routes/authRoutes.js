const express = require("express");
const {
  register,
  login,
  googleLogin,
  googleRegister,
} = require("../controllers/authController.js");
const googleSignInMiddleWare = require("../middleware/googleSignInMiddleware.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google-login", googleSignInMiddleWare, googleLogin);
authRouter.post("/google-register", googleSignInMiddleWare, googleRegister);

module.exports = authRouter;
