import Cart from "../models/Cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Product from "../models/Product.models.js";
import User from "../models/User.model.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = "66d04f2b7a890445eb1f736c";  // Replace with dynamic user ID in production


    // Validate product ID
    if (!productId) {
        return res.status(400).json({
            statusCode: 400,
            data: [],
            success: false,
            message: "Product ID is required",
        });
    }

    // Validate quantity
    if (!quantity || quantity <= 0) {
        return res.status(400).json({
            statusCode: 400,
            data: [],
            success: false,
            message: "Quantity must be greater than zero",
        });
    }

    // Retrieve or create cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // Retrieve product details
    const productDetail = await Product.findById(productId);
    if (!productDetail) {
        return res.status(404).json({
            statusCode: 404,
            data: [],
            success: false,
            message: `Product not found: ${productId}`,
        });
    }

    if(productDetail.stock < quantity){
        return res.status(401).json({
            statusCode : 401,
            success : false,
            message : `Not enough stock for ${productDetail.name}`
        })
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex >= 0) {
        // Update the quantity and total price
        const existingItem = cart.items[itemIndex];
        if (existingItem.quantity + quantity > productDetail.stock) {
            return res.status(400).json({
                statusCode : 400,
                success : false,
                message : `Cannot add more than ${productDetail.stock} items of ${productDetail.name}`
            })
        }
        existingItem.quantity += quantity;
        cart.totalPrize += (quantity * productDetail.price);
        // cart.totalPrize += (quantity * 1200);
    } else {
        // Add new product to the cart
        if (quantity > productDetail.stock) {
            return res.status(400).json({
                statusCode : 400,
                success : false,
                message : `Cannot add more than ${productDetail.stock} items of ${productDetail.name}`
            })
        }
        cart.items.push({ product: productId, quantity });
        // cart.totalPrize += (quantity * 1200);
        cart.totalPrize += (quantity * productDetail.price);
    }
    
    productDetail.stock -= quantity;
    if (productDetail.stock < 1) {
        productDetail.stock = 0; // Ensure stock doesn't go below 0
    }
    await productDetail.save();

    // Save the updated cart
    await cart.save();

    // Update the user's cart reference
    await User.findByIdAndUpdate(userId, { $set: { cart: cart._id } }, { new: true });

    // Return success response with the updated cart
    res.status(200).json(new ApiResponse(200, cart, 'Product added to cart successfully'));
});
