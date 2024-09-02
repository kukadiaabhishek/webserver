import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
            },
            quantity: {
                type: Number,
                default: 1,
              },
        }
      ],
      totalPrize : {
        type : Number,
        default : 0
      }
} , {timestamps : true})

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
