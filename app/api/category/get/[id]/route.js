import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import CategoryModel from "@/models/category.model";
import { isValidObjectId } from "mongoose";


export async function GET(request, { params }) {
    try {
        const { isAuth } = await isAuthenticated("admin");
        if (!isAuth) {
            return response(false, 401, "Unauthorized");
        }
        await connectDB();
        const paramsData = await params;
        const id = paramsData.id;

        if (!isValidObjectId(id)) {
            return response(false, 400, "Invalid ID");
        }
        const filter = {
            deletedAt: null,
            _id: id
        }
        const category = await CategoryModel.findOne(filter);

        if (!category) {
            return response(false, 404, "Category not found");
        }
        return response(true, 200, "Category fetched successfully", category);

    } catch (error) {
        return catchError(error);
    }
}