import connectDB from "@/lib/connectionDB";
import { response } from "@/lib/response";
import { authSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {

    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = authSchema.pick({ email: true, otp: true });
        const result = validationSchema.safeParse(payload);
        if (!result.success) {
            return response(false, 400, "Invalid request", result.error);
        }
        // Continue with OTP verification logic
        const { email, otp } = result.data;
        const otpRecord = await OTPModel.findOne({ email });
        if (!otpRecord || otpRecord.otp !== otp) {
            return response(false, 400, "Invalid OTP or email", null);
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response(false, 404, "User not found", null);
        }
        const loginUserData = {
            _id: user._id,
            role: user.role,
            name: user.name,
            avatar: user.avatar,
        }
        const token = jwt.sign(loginUserData, process.env.JWT_SECRET, { expiresIn: "7d" });

        const res = NextResponse.json(
            { success: true, statusCode: 200, message: "OTP Verified Successfully", data: loginUserData },

        );

        res.cookies.set({
            name: 'AccessToken',
            value: token,
            httpOnly: process.env.NODE_ENV === 'production',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        if (res) {
            await otpRecord.deleteOne();
        }

        return res;


    } catch (error) {
        return response(false, 500, "Internal Server Error", error.message);
    }

    // Verify the email using the token
}