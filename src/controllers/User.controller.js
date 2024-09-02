import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/User.model.js";

export const createUser = asyncHandler(async(req ,res)=>{
    try{
        const userData = new User({
            fullName : "Abhishek",
            email : "abhishek@123@gmail.com",
            password : "123abc",
            phone : 123852789,
            address : "absc",
            isActive : true
        })
        await userData.save();
        
        res.status(201).json(new ApiResponse(201, userData, "User created successfully"))
    }catch(err){
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: "fail to create User",
        })
    }
})