import { Router } from "express";
import { createUser } from "../controllers/User.controller.js"; 
const router = Router();


//product
router.route("/create_user").post(createUser)
export default router