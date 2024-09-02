import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new mongoose.Schema(
  {
    uuid: {
        type: String,
        default: uuidv4, // Function reference to generate UUID
        unique: true // Ensure UUID is unique
      },
    cart : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Cart'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_amount: {
      type : Number,
      required: true,
    },
    paymentStatus : {
      type : String,
      enum : ['Pending' , 'Completed' , 'Failed' , 'Refunded'],
      default : "Pending"
  },
  monto_total : {
    type : String,
    default : 'PYG'  //currency
  },
  tipo_pedido : {
    type : String,
    enum : ['VENTA-COMERCIO' , 'COMERCIO-HEREDADO'],
   default : 'VENTA-COMERCIO',
  },
  
  paymentId: {
    type: String
  },
  orderId: {
    type: String
  },

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;