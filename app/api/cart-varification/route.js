import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import ProductVariantModel from "@/models/productVariant.model";

export async function POST(request) {
    try {

        await connectDB();
        const payload = await request.json();

        const varificationData = await Promise.all(
            payload.map(async (item) => {
                const varient = await ProductVariantModel.findById(item.variantId).populate('product').populate('media', 'secure_url').lean();
                if (varient) {
                    return {
                        productId: varient.product._id,
                        variantId: varient._id,
                        name: varient.product.name,
                        url: varient.product.slug,
                        color: varient.color,
                        size: varient.size,
                        sellingPrice: varient.sellingPrice,
                        mrp: varient.mrp,
                        quantity: item.quantity,
                        media: varient.media[0].secure_url,
                    }
                }
            })
        )
        return response(true, 200, "Cart varification successful", varificationData);
    } catch (error) {
        return catchError(error);
    }

}