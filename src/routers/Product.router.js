import { Router } from "express";
import { createProduct } from "../controllers/Product.controller.js";
import { addToCart } from "../controllers/Cart.controller.js";
import { createOrder } from "../controllers/Order.controller.js";
const router = Router();


//product
router.route("/create_product").post(createProduct)
router.route("/add_to_cart").post(addToCart)
router.route('/create_order').post(createOrder)

export default router