import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import CoupanModel from "@/models/coupan.model";

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
        const coupan = await CoupanModel.find(filter).select('-__v').sort({ createdAt: -1 }).lean();

        if (!coupan) {
            return response(false, 404, "coupan not found");
        }
        return response(true, 200, "coupan fetched successfully", coupan);

    } catch (error) {
        return catchError(error);
    }
}