import mongoose from "mongoose";
let catched = global.mongoose;
if (!catched) {
    catched = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    try {
        if (catched.conn) {
            return catched.conn;
        }
        if (!catched.promise) {
            catched.promise = mongoose.connect(process.env.MONGO_URI, {
                bufferCommands: false,
            });
            console.log("MongoDB connected");
        }
        catched.conn = await catched.promise;
        return catched.conn;

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
