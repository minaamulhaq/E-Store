import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import ReviewModel from "@/models/review.model";

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
        const reviews = await ReviewModel.find(filter).select('-__v -password -avatar').sort({ createdAt: -1 }).lean();

        if (!reviews) {
            return response(false, 404, "Reviews not found");
        }
        return response(true, 200, "Reviews fetched successfully", reviews);

    } catch (error) {
        return catchError(error);
    }
}