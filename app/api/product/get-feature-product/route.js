import connectDB from "@/lib/connectionDB";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import ProductModel from "@/models/product.model";
import MediaModel from "@/models/media.model";
export async function GET() {
    try {

        await connectDB();

        const product = await ProductModel.find({ deletedAt: null }).populate('media', '_id secure_url').limit(8).lean();

        if (!product) {
            return response(false, 404, "Product not found");
        }
        return response(true, 200, "Product fetched successfully", product);

    } catch (error) {
        return catchError(error);
    }
}