import connectDB from "@/lib/connectionDB";
import { response } from "@/lib/response";
import UserModel from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function POST(request) {

    try {
        await connectDB();
        const { token } = await request.json();
        if (!token) {
            return response(false, 400, "Token is required", null);
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return response(false, 401, "Invalid token", null);
        }
        // Assuming you have a User model to update the user's email verification status
        const userId = decodedToken.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return response(false, 404, "User not found", null);
        }
        user.isEmailVerified = true;
        await user.save();
        return response(true, 200, "Email verified successfully", null);

    } catch (error) {
        return response(false, 500, "Internal Server Error", null);
    }

    // Verify the email using the token
}