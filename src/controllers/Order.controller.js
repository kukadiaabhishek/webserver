import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.models.js";
import { model } from "mongoose";
// import Razorpay from "razorpay";

// const instance = new Razorpay({
//     key_id : process.env.RAZORPAY_API_KEY,
//     key_secret : process.env.RAZORPAY_KEY_SECRET
// })

export const createOrder = asyncHandler(async(req ,res)=>{
    const { cartId } = req.body;
    if (!cartId) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: "Cart Id is required",
        })
      }
    
      const cartDetail = await Cart.findById(cartId);
      if (!cartDetail) { 
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Cart not found with this ID",
        })
      }
    
      if (cartDetail.items.length === 0) {   
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Cart is empty",
        })
    }
      
      for(const item of cartDetail.items){
        const product = await Product.findById(item.product);
        if(product.stock < item.quantity){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: `Not enough stock for ${product.name}`,
            })
        }
        product.stock -= item.quantity
        await product.save()
      }

    const amount = cartDetail.totalPrize * 100;

    // const options = {
    //     amount : amount,
    //     currency : "PYG",
    //     receipt : `receipt_order_${cartId}`
    // }

    try{
        const order = "66d04f2b123" 
        // const order = await instance.orders.create(options)
        const userId = "66d04f2b7a890445eb1f736c";
        const orderData = await Order.create({
            cart : cartId,
            user : userId,
            total_amount : cartDetail.totalPrize,
            paymentStatus : "Pending",
            monto_total : "PYG",
            orderId : order
        })

        // const orderDetail = await Order.findById(orderData._id).populate('cart').populate('user')
        const orderDetail = await Order.findById(orderData._id)
        .populate({
          path: 'cart',
          populate: {
            path: 'items.product', // populate the product field inside items array
            model: 'Product', // ensure you specify the correct model name
          }
        })
        .populate({
          path: 'user', // populate the user field
          populate: {
            path: 'comprador', // populate the comprador field inside the user
            model: 'Comprador' // ensure you specify the correct model name for Comprador
          }
        });
      

        const finalData = {
            "token" : "fbe4586135e7f482d6c8ad624413139b9c90825f",
            "comprador" : {
                "ruc" : "",
                "email" : orderDetail.user.email,
                "ciudad" : 1,
                "nombre" : orderDetail.user.fullName,
                "telefone" : orderDetail.user.phone,
                "direccion" : orderDetail.user.address,
                "documento" : orderDetail.user._id,
                "coordenadas" : orderDetail.user.comprador[0].coordenadas,
                "razon_social" : "",
                "tipo_documento" : orderDetail.user.comprador[0].tipo_documento,
                "direccion_referencia" : ""
            },
            "public_key" : "98b97ce494801bf26575a5c4ff2d4f14",
            "monto_total" : orderDetail.total_amount,
            "tipo_pedido" : "",
            "compras_items" : [
                {
                    "ciudad" : orderDetail.user.comprador[0].ciudad,
                    "nombre" : orderDetail.cart.items[0].product.name,
                    "cantidad" : orderDetail.cart.items[0].quantity,
                    "categoria" : 909,
                    'public_key' : "98b97ce494801bf26575a5c4ff2d4f14",
                    "url_imagen" : "",
                    "descripction" : orderDetail.cart.items[0].product.short_description,
                    "id_producto" : 895,
                    "precio_total" : orderDetail.total_amount,
                    "vendedor_telefone" : orderDetail.user.phone,
                    "vendedor_direccion" : orderDetail.user.address,
                   "vendedor_direccion_referencia" : "",
                   "vendedor_direccion_coordenadas" : "" 
                }
            ],
            "fecha_maxima_pago" : "2018-01-04 14:14:48",
            "id_pedido_comercio" : 1134,
            "descripcion_resumen" : "Ticket virtual a evento Ejemplo 2017",
            "forma_pago" : ""
        }
        res.status(201).json(new ApiResponse(201, finalData, 'Payment initiated successfully'));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode : 500,
            success : false,
            message :"Something went wrong while creating the order" 
        })
  }
})