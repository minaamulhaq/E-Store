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
        const validatedData = formSchema.safeParse(payload);
        if (!validatedData.success) {
            return response(false, 400, "Invalid user Input");
        }



        const product = new ProductVariantModel({
            product: validatedData.data.product,
            sku: validatedData.data.sku,
            color: validatedData.data.color,
            size: validatedData.data.size,
            mrp: validatedData.data.mrp,
            sellingPrice: validatedData.data.sellingPrice,
            discountPercentage: validatedData.data.discountPercentage,
            media: validatedData.data.media,
        });
        await product.save();
        return response(true, 201, "Product Variant created successfully", product);

    } catch (error) {
        return catchError(error);
    }

}