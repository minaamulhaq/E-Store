import { emailVerificationLink } from "@/email/emailVarificationLink";
import { otpEmail } from "@/email/otpEmail";
import connectDB from "@/lib/connectionDB";
import { catchError, generateOTP, response } from "@/lib/response";
import { sendMail } from "@/lib/sendMail";
import { authSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.model";
import jwt from "jsonwebtoken";
import z from "zod";

export async function POST(request) {
    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = authSchema.pick({ email: true }).extend(
            { password: z.string() }
        );
        const validation = validationSchema.safeParse(payload);
        if (!validation.success) {
            return response(false, 401, "Validation Error", validation.error);
        }
        const { email, password } = validation.data;
        // Further login logic goes here (e.g., checking user credentials)
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return response(false, 404, "User not found");
        }
        if (user.isEmailVerified === false) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const link = `${process.env.NEXT_PUBLIC_URL}/auth/verify-email/${token}`;
            await sendMail("Email Verification", email, emailVerificationLink(link));
        }
        //password varification 
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return response(false, 400, "Invalid Credentials");
        }
        //otp genration 
        await OTPModel.deleteMany({ email });
        const otp = generateOTP();
        const createdOTP = await OTPModel.create({ email, otp });
        await createdOTP.save();
        //send otp to email
        const mailResponse = await sendMail("OTP Verification", email, otpEmail(otp));
        if (!mailResponse.success) {
            console.error("Failed to send OTP email:", mailResponse);
            return response(false, 500, "Failed to send OTP email");
        }
        return response(true, 200, "Please verify your OTP");

    } catch (error) {
        return catchError(error);
    }
}