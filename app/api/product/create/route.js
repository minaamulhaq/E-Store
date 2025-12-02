import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import { productSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import { encode } from "entities";

export async function POST(request) {
    const payload = await request.json();
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized Access");
        }


        const formSchema = productSchema.pick({
            name: true,
            slug: true,
            category: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            description: true,
            media: true,
        });
        const validatedData = formSchema.parse(payload);

        const product = new ProductModel({
            name: validatedData.name,
            slug: validatedData.slug,
            category: validatedData.category,
            mrp: validatedData.mrp,
            sellingPrice: validatedData.sellingPrice,
            discountPercentage: validatedData.discountPercentage,
            description: encode(validatedData.description),
            media: validatedData.media,
        });
        await product.save();
        return response(true, 201, "Product created successfully", product);

    } catch (error) {
        return catchError(error);
    }

}