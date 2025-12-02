import { otpEmail } from "@/email/otpEmail";
import connectDB from "@/lib/connectionDB";
import { catchError, generateOTP, response } from "@/lib/response";
import { sendMail } from "@/lib/sendMail";
import { authSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.model";


export async function POST(request) {
    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = authSchema.pick({ email: true });
        const result = validationSchema.safeParse(payload);
        if (!result.success) {
            return response(false, 400, 'Invalid request data', result.error);
        }
        const { email } = result.data;
        const user = await UserModel.findOne({ deletedAt: null, email }).lean();
        if (!user) {
            return response(false, 404, 'User not found');
        }
        // Delete existing OTPs for the email
        await OTPModel.deleteMany({ email });
        // Generate a new OTP
        const otp = generateOTP();
        const createdOTP = await OTPModel.create({ email, otp });
        await createdOTP.save();
        // Send the new OTP to the user's email
        // const mailResponse = await sendMail("OTP Verification", email, otpEmail(otp));
        // if (!mailResponse.success) {
        //     return response(false, 500, "Failed to send OTP email");
        // }
        return response(true, 200, "A new OTP has been sent to your email");


    } catch (error) {
        return catchError(error);
    }
}