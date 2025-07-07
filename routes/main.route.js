import express from "express";
import {signInAction, signUpAction ,forgotPasswordAction ,logoutAction ,  verifyOtp , resendOtp, googleLogin} from "../controller/main.controller.js";
import { body } from "express-validator";
const router = express.Router();

router.post("/sign-in",signInAction);
router.post("/sign-up",
    body("username", "username is required").notEmpty(),
    body("email", "email id is required").notEmpty(),
    body("email", "invalid email id").isEmail(),
    body("password", "password is required").notEmpty(),
    signUpAction);

     router.post("/verify-otp", verifyOtp);
      router.post("/resend-otp", resendOtp);
router.post("/forgot-password",forgotPasswordAction);
router.post("/google-login", googleLogin);
router.get("/logout", logoutAction);


export default router;
