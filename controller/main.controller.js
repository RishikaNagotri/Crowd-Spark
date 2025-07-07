import { validationResult } from "express-validator";
import { Founder } from "../model/founder.model.js";
import { Investor } from "../model/investor.model.js";
import {User} from "../model/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import admin from "../middleware/firebaseAdmin.js";
dotenv.config();

const otpStore = new Map();
//Sign-up
export const signUpAction = async (request, response, next) => {
    try {
        const error = validationResult(request);
        if (!error.isEmpty())
            return response.status(401).json({ error: "Bad request | Invalid data", errorDetails: error.array() });

        let {username, password, email } = request.body;
        let saltKey = bcrypt.genSaltSync(12);
        password = bcrypt.hashSync(password, saltKey);
        request.body.password = password;

        const otp = generateOTP();
        const expiry = Date.now() + 2 * 60 * 1000;
        otpStore.set(email, { otp, expiry, attempts: 0 });

        const emailStatus = await sendEmailWithOTP(email, otp);
        const result = emailStatus && await User.create(request.body);

        return response.status(201).json({ message: "OTP sent to email for verification. Verify your Email", userDetail: result });
    } catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error" });
    }
};
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendEmailWithOTP(toEmail, otp) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.GMAIL_ID,
            to: toEmail,
            subject: 'Account OTP',
            html: `<h4>Dear user,</h4>
            <p>Your OTP is:</p>
            <h2>${otp}</h2>
            <p>This OTP is valid for 2 minutes.</p>
            <b>Healthy Bites</b>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error while sending mail: ", error);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.verified) return res.status(400).json({ error: "User already verified" });

        const savedOTP = otpStore.get(email);
        if (!savedOTP) return res.status(400).json({ error: "OTP not found or expired" });

        if (savedOTP.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
        if (savedOTP.expiry < Date.now()) {
            otpStore.delete(email);
            return res.status(400).json({ error: "OTP expired" });
        }

        user.verified = true;
        await user.save();
        otpStore.delete(email);

        return res.status(200).json({ message: "Account verified successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.verified) return res.status(400).json({ error: "User already verified" });

        const otp = generateOTP();
        const expiry = Date.now() + 2 * 60 * 1000;
        otpStore.set(email, { otp, expiry, attempts: 0 });

        const emailStatus = await sendEmailWithOTP(email, otp);
        if (emailStatus) {
            return res.status(200).json({ message: "OTP resent to your email." });
        } else {
            return res.status(500).json({ error: "Failed to send OTP" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signInAction = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    // Founder Login
    let founder = await Founder.findOne({ email });
    if (founder) {
      if (!founder.verified) {
        return response.status(401).json({ error: "Not verified | Please verify your account" });
      }

      const isMatch = bcrypt.compareSync(password, founder.password);
      if (!isMatch) {
        return response.status(401).json({ error: "Invalid password" });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { userId: founder._id, role: "founder" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Set JWT Token in Cookie
      response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Hide password before sending response
      founder.password = undefined;

      return response.status(200).json({
        message: "Sign In Success (Founder)",
        userType: "founder",
           user: {
        id: founder._id,    
        username: founder.username,  
        email: founder.email
    },token
      });
    }

    // Investor Login
    let investor = await Investor.findOne({ email });
    if (investor) {
      if (!investor.verified) {
        return response.status(401).json({ error: "Not verified | Please verify your account" });
      }

      const isMatch = bcrypt.compareSync(password, investor.password);
      if (!isMatch) {
        return response.status(401).json({ error: "Invalid password" });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { userId: investor._id, role: "investor" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );


      investor.password = undefined;

      return response.status(200).json({
        message: "Sign In Success (Investor)",
        userType: "investor",
        user: {
        id: investor._id,    
        username: investor.username,  
        email: investor.email
    },token
      });
    }

    // No user found
    return response.status(401).json({ error: "Unauthorized user | Email ID not found" });

  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};


//Forgot-Password
export const forgotPasswordAction = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {

    let user = await Founder.findOne({ email });
    if (user) {
      user.password = bcrypt.hashSync(newPassword, 10);
      await user.save();
      return res.status(200).json({ message: "Password updated successfully (Founder)" });
    }


    user = await Investor.findOne({ email });
    if (user) {
      user.password = bcrypt.hashSync(newPassword, 10);
      await user.save();
      return res.status(200).json({ message: "Password updated successfully (Investor)" });
    }

    return res.status(404).json({ message: "User not found with this email" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logoutAction = (req, res) => {
  try {
    // 🧹 Clear the JWT token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ message: "Error during logout", error: err.message });
  }
};





export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid: googleId } = decodedToken;

    // Check if user exists as Founder
    let founder = await Founder.findOne({ email });

    if (founder) {
      // Generate JWT token for Founder
      const authToken = jwt.sign(
        { userId: founder._id, role: "founder" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: `Welcome Founder ${founder.username}`,
        userType: "founder",
        user: {
          id: founder._id,
          username: founder.username,
          email: founder.email,
        },
        token: authToken,
      });
    }

    // Check if user exists as Investor
    let investor = await Investor.findOne({ email });

    if (investor) {
      // Generate JWT token for Investor
      const authToken = jwt.sign(
        { userId: investor._id, role: "investor" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: `Welcome Investor ${investor.username}`,
        userType: "investor",
        user: {
          id: investor._id,
          username: investor.username,
          email: investor.email,
        },
        token: authToken,
      });
    }

    // User not found in either Founder or Investor
    return res.status(401).json({ error: "User not registered with this email" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

