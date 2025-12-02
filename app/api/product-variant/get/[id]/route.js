import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import ProductVariantModel from "@/models/productVariant.model";



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
        const getProductVariant = await ProductVariantModel.findOne(filter).populate('media', '_id secure_url').lean();

        if (!getProductVariant) {
            return response(false, 404, "Product - Variant not found");
        }
        return response(true, 200, "Product - Variant fetched successfully", getProductVariant);

    } catch (error) {
        return catchError(error);
    }
}