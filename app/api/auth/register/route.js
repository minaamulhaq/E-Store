import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import { authSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import jwt from "jsonwebtoken";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVarificationLink";
export async function POST(request) {
    try {
        await connectDB();
        const validateSchema = authSchema.pick({ name: true, email: true, password: true });
        const data = await request.json();
        const parsedData = validateSchema.safeParse(data);
        if (!parsedData.success) {
            return response(false, 401, "Invalid or Missing Input Fields", parsedData.error)
        }
        // Check if user already exists
        const { name, email, password } = parsedData.data;
        const ckeckUser = await UserModel.exists({ email });
        if (ckeckUser) {
            return response(false, 409, "User already exists with this email");
        }
        //new Registration
        const newUser = await UserModel.create({ name, email, password });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const link = `${process.env.NEXT_PUBLIC_URL}/auth/verify-email/${token}`;

        await sendMail("Email Verification", email, emailVerificationLink(link));

        return response(true, 201, "Registration Successful - Please verify your email");
    } catch (error) {
        return catchError(error);
    }
}