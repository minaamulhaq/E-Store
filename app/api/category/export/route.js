import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import CategoryModel from "@/models/category.model";



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
        const category = await CategoryModel.find(filter).sort({ createdAt: -1 }).lean();

        if (!category) {
            return response(false, 404, "Category not found");
        }
        return response(true, 200, "Category fetched successfully", category);

    } catch (error) {
        return catchError(error);
    }
}