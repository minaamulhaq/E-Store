import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import CategoryModel from "@/models/category.model";

export async function GET() {
    try {
        await connectDB();
        const categories = await CategoryModel.find({ deletedAt: null });
        return response(true, 200, "Categories fetched successfully", categories);
    } catch (error) {
        console.log("Error in GET /category/get-category:", error);
        console.error("Error fetching categories:", error);
        return catchError(error);
    }

}