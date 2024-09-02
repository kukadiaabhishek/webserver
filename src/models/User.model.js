import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    cart : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cart"
    },
    comprador : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comprador"
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
