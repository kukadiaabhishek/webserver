import Product from "../models/Product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Set up __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export const createProduct = asyncHandler(async (req, res) => {
//     const filePath = path.join(__dirname, '..', 'data', 'testing.json');

//     fs.readFile(filePath, 'utf8', async (err, jsonData) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return res.status(500).json(new ApiResponse(500, null, 'Error reading file.'));
//         }

//         const productData = JSON.parse(jsonData);

//         console.log("productData:", productData);
        
//         // Ensure the data is in the correct format for your Product model
//         // const products = productData.map(item => new Product(item));

//         try {
//             // Save each product in the array
//             // const savedProducts = await Product.insertMany(products);
//             // res.status(201).json(new ApiResponse(201, savedProducts, "Products created successfully"));
//             console.log('Products saved successfully:', savedProducts);
//         } catch (err) {
//             console.error('Error saving products:', err);
//             res.status(500).json(new ApiResponse(500, null, 'Error saving products.'));
//         }
//     });
// });

export const createProduct = asyncHandler(async(req ,res)=>{
    try{
        const productData = new Product(
            {
                "name": " Laptop Case Bag",
                "slug": "laptop-case-bag",
                "price": 1200,
                "sale_price": null,
                "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
                "stock": 56,
                "ratings": 4.5,
                "reviews": 2,
                "sale_count": 0,
                "is_new": true,
                "is_hot": null,
                "is_out_of_stock": null,
                "rated": null,
                "until": null,
                "variants": [
                    {
                        "price": 999,
                        "sale_price": 666,
                        "size": {
                            "name": "Large",
                            "size": "L"
                        },
                        "color": {
                            "name": "black",
                            "color": "#000000"
                        }
                    },
                    {
                        "price": 1499,
                        "sale_price": 1099,
                        "size": {
                            "name": "Small",
                            "size": "S"
                        },
                        "color": {
                            "name": "green",
                            "color": "#81d742"
                        }
                    },
                    {
                        "price": 888,
                        "sale_price": 444,
                        "size": {
                            "name": "Medium",
                            "size": "M"
                        },
                        "color": {
                            "name": "indigo",
                            "color": "#6085a5"
                        }
                    }
                ],
                "large_pictures": [
                    {
                        "url": "/uploads/product_9_2_0c1a290690.jpg",
                        "width": 800,
                        "height": 800
                    },
                    {
                        "url": "/uploads/product_9_1_55aca0ab66.jpg",
                        "width": 800,
                        "height": 800
                    }
                ],
                "pictures": [
                    {
                        "url": "/uploads/product_9_2_0c1a290690.jpg",
                        "width": 800,
                        "height": 800
                    },
                    {
                        "url": "/uploads/product_9_1_55aca0ab66.jpg",
                        "width": 800,
                        "height": 800
                    }
                ],
                "small_pictures": [
                    {
                        "url": "/uploads/product_9_2_0c1a290690.jpg",
                        "width": 800,
                        "height": 800
                    },
                    {
                        "url": "/uploads/product_9_1_55aca0ab66.jpg",
                        "width": 800,
                        "height": 800
                    }
                ],
                "categories": [
                    {
                        "name": "T-shirts",
                        "parent": "Fashion",
                        "slug": "t-shirts"
                    },
                    {
                        "name": "Headphone",
                        "parent": "Com",
                        "slug": "headphone-1"
                    }
                ],
                "tags": [
                    {
                        "name": "Sweater",
                        "slug": "sweater"
                    },
                    {
                        "name": "Clothes",
                        "slug": "clothes"
                    }
                ]
            },
        )
        await productData.save();
        
        res.status(201).json(new ApiResponse(201, productData, "User created successfully"))
    }catch(err){
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: "fail to create User",
        })
    }
})