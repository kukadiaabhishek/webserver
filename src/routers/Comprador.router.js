import { Router } from "express";
import { createShippingAddress } from "../controllers/Comprador.controller.js";
const router = Router();


//product
router.route("/create_address").post(createShippingAddress)

export default router