import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        // Construct the full MongoDB URI
        const mongoURI = `${process.env.MONGODB_URI}${DB_NAME}`;
        
        // Connect to MongoDB
        const connectionIntense = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected...!! DB HOST : ${connectionIntense.connection.host}`);
    } catch (err) {
        console.log("MONGODB connection Failed", err);
        process.exit(1);
    }
};
