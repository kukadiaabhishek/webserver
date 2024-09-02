import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Comprador from "../models/Comprador.model.js";
import User from "../models/User.model.js";

export const createShippingAddress = asyncHandler(async (req, res) => {
    const {
        ciudad ,coordenadas ,tipo_documento
    } = req.body;
    const user = "66d04f2b7a890445eb1f736c"

    const shippingAddress = await Comprador.create({
        ciudad,
        coordenadas,
        tipo_documento, 
        userId : user
    });

    const checkAddress = await Comprador.findById(shippingAddress._id);
    if (!checkAddress) {
       return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Failed to create shipping address",
        })
    }

   const userDetail = await User.findById(user);
   userDetail.comprador.push(checkAddress._id)
   await userDetail.save()

    return res.status(200).json(
        new ApiResponse(200, checkAddress, "Shipping address created successfully")
    );
});