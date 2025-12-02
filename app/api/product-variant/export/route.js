import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, } from "@/lib/response";
import { response } from "@/lib/response";
import ProductVariantModel from "@/models/productVariant.model";




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
        const Product = await ProductVariantModel.find(filter).select('-media -__v').populate('product', 'name').sort({ createdAt: -1 }).lean();

        if (!Product) {
            return response(false, 404, "Product not found");
        }
        const formattedProducts = Product.map(pv => ({
            ...pv,
            product: pv.product?.name || null, // product as string
        }));
        return response(true, 200, "Product fetched successfully", formattedProducts);

    } catch (error) {
        return catchError(error);
    }
}