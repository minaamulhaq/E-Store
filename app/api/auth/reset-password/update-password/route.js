import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import { authSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";

export async function PUT(request) {
    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = authSchema.pick({ email: true, password: true });
        const result = validationSchema.safeParse(payload);
        if (!result.success) {
            return response(false, 400, "Invalid request", result.error);
        }

        const { email, password } = result.data;
        const user = await UserModel.findOne({ deletedAt: null, email }).select("+password");
        if (!user) {
            return response(false, 404, "User not found", null);
        }

        user.password = password;
        await user.save();

        return response(true, 200, "Password updated successfully", null);
    } catch (error) {
        return catchError(error);
    }
}