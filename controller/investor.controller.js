import { validationResult } from "express-validator";
import { Investor } from "../model/investor.model.js";
import { Founder } from "../model/founder.model.js";
import {User} from "../model/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const registerAction = async (request, response, next) => {
    try {
        const error = validationResult(request);
        if (!error.isEmpty()) {
            return response.status(401).json({
                error: "Bad request | Invalid data",
                errorDetails: error.array()
            });
        }

        const { email, password } = request.body;

        let isVerified = false;
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.verified === true) {
            isVerified = true;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const investorData = {
            ...request.body,
            password: hashedPassword,
            verified: isVerified
        };

        const result = await Investor.create(investorData);

        return response.status(201).json({
            message: "Investor created.",
            userDetail: result
        });

    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};


export const dashboard = (request,response,next)=>{
    
  console.log("Investor dashboard API hit ");

    Founder.find({}, 'username startupName sector  requiredBudget ')
    .then(result=>{
         console.log("Founders fetched:", result);
        return response.status(200).json({founders:result});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    });
}

export const getfounder = (request,response,next)=>{
    let id = request.params.id;
    Founder.findById(id).select('-email -password ') 
    .then(result=>{
        return response.status(200).json({founders:result});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
}

export const getprofile = (request, response) => {
  const id = request.params.id;
  Investor.findById(id)
    .select('-password') 
    .then(result => {
      if (!result) return response.status(404).json({ error: "Investor not found" });
      return response.status(200).json({ investor: result });
    })
    .catch(err => {
      return response.status(500).json({ error: "Internal Server Error" });
    });
};


export const editprofile = (req, res) => {
  const id = req.params.id;

  const updatedData = {
    username: req.body.username,
    contact: req.body.contact,
    budget: req.body.budget,
    address: req.body.address,
    email: req.body.email,
    occupation: req.body.occupation,
    sectorsofinterest: req.body.sectorsofinterest
  };

  Investor.findByIdAndUpdate(id, updatedData, { new: true })
    .then(updatedInvestor => {
      return res.status(200).json({ message: "Profile updated", investor: updatedInvestor });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};
