import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import ProductVariantModel from "@/models/productVariant.model";


export async function GET() {
    try {
        await connectDB();
        const Color = await ProductVariantModel.find({ deletedAt: null }).distinct('color');
        return response(true, 200, "Color fetched successfully", Color);
    } catch (error) {

        return catchError(error);
    }

}