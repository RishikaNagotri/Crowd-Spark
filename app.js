import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import InvestorRouter from "./routes/investor.route.js"
import FounderRouter from "./routes/founder.route.js"
import MainRouter from "./routes/main.route.js"
import cors from "cors";
import db from "./db/dbConfig.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

db()
.then(()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use("/investor",InvestorRouter);
    app.use("/founder",FounderRouter);
    app.use("/",MainRouter);

    app.listen(process.env.PORT,()=>{
        console.log("Server Started...")
    })
})
.catch(err=>{
    console.log("Database connection error");
})