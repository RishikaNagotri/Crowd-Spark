import express from "express";
import { registerAction  ,dashboard,getinvestor ,getprofile , editprofile} from "../controller/founder.controller.js";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/register",
    body("username","username is required").notEmpty(),
    body("email","email id is required").notEmpty(),
    body("email","invalid email id").isEmail(),
    body("address","address is required").notEmpty(),
    body("requiredBudget","budget is required").notEmpty(),
    body("startupName","startupName is required").notEmpty(),
    body("sector","sector is required").notEmpty(),
    body("contact","only digits are allowed").isNumeric(),registerAction);
  router.get("/dashboard",dashboard);
  router.get("/:id",auth,getinvestor);
  router.get("/getprofile/:id",auth,getprofile);
  router.put("/editprofile/:id",editprofile);
  
  
  export default router;
