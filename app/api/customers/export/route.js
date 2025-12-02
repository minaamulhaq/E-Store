import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import UserModel from "@/models/user.model";


export async function GET(request) {
    try {
        const { isAuth } = await isAuthenticated("admin");
        if (!isAuth) {
            return response(false, 401, "Unauthorized");
        }
        await connectDB();

        const filter = {
            deletedAt: null,

        }
        const user = await UserModel.find(filter).select('-__v -password -avatar').sort({ createdAt: -1 }).lean();

        if (!user) {
            return response(false, 404, "User not found");
        }
        return response(true, 200, "User fetched successfully", user);

    } catch (error) {
        return catchError(error);
    }
}