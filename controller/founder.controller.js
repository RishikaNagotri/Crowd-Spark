import { validationResult } from "express-validator";
import { Founder } from "../model/founder.model.js";
import { Investor } from "../model/investor.model.js";
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

        const FounderData = {
            ...request.body,
            password: hashedPassword,
            verified: isVerified
        };

        
        const result =  await Founder.create(FounderData);

        return response.status(201).json({
            message: "Founder created.",
            userDetail: result
        });

    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};





export const dashboard = (request,response,next)=>{
    Investor.find({}, 'username budget ')
    .then(result=>{
        return response.status(200).json({investors:result});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    });
}

export const getinvestor = (request,response,next)=>{
    let id = request.params.id;
    Investor.findById(id).select('-email -password ') 
    .then(result=>{
        return response.status(200).json({investors:result});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
}

export const getprofile = (request,response,next)=>{
    let id = request.params.id;
    Founder.findById(id).select('-password') 
    .then(result=>{
        return response.status(200).json({founder:result});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
}

export const editprofile = (request, response, next) => {
    const id = request.params.id;
  
    const updatedData = {
      username: request.body.username,
      contact: request.body.contact,
      requiredBudget: request.body.requiredBudget,
      address: request.body.address,
      startupName: request.body.startupName,
      sector: request.body.sector,
      startupDescription: request.body.startupDescription,
    };
  
    Founder.findByIdAndUpdate(id, updatedData, { new: true })
      .then(updatedFounder => {
        return response.status(200).json({ message: "Profile updated", founder: updatedFounder });
      })
      .catch(err => {
        return response.status(500).json({ error: "Internal Server Error" });
      });
  };
  