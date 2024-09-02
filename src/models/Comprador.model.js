import mongoose from "mongoose";

const compradorSchema = new mongoose.Schema({
    ciudad: {
        type: String,  // courier services
        default : 1
    },
    coordenadas: {
        type: String, //buyer address
    },
    tipo_documento: {
        type: String,
        default : 'CI' // Buyer's document type
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Added required for consistency
    },
}, {timestamps: true});

const Comprador = mongoose.model("Comprador", compradorSchema);
export default Comprador;
