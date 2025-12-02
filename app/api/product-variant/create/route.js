import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import { productSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import ProductVariantModel from "@/models/productVariant.model";
import { encode } from "entities";

export async function POST(request) {
    const payload = await request.json();
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized Access");
        }


        const formSchema = productSchema.pick({
            product: true,
            sku: true,
            color: true,
            size: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true,

        });
        const validatedData = formSchema.parse(payload);

        const product = new ProductVariantModel({
            product: validatedData.product,
            sku: validatedData.sku,
            color: validatedData.color,
            size: validatedData.size,
            mrp: validatedData.mrp,
            sellingPrice: validatedData.sellingPrice,
            discountPercentage: validatedData.discountPercentage,
            media: validatedData.media,
        });
        await product.save();
        return response(true, 201, "Product Variant created successfully", product);

    } catch (error) {
        return catchError(error);
    }

}