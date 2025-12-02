import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import ProductModel from "@/models/product.model";




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
        const Product = await ProductModel.find(filter).select('-media -__v -description').sort({ createdAt: -1 }).lean();

        if (!Product) {
            return response(false, 404, "Product not found");
        }
        return response(true, 200, "Product fetched successfully", Product);

    } catch (error) {
        return catchError(error);
    }
}