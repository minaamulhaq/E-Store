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
        const validatedData = formSchema.safeParse(payload);
        if (!validatedData.success) {
            return response(false, 400, "Invalid user Input");
        }

        const product = new ProductModel({
            name: validatedData.data.name,
            slug: validatedData.data.slug,
            category: validatedData.data.category,
            mrp: validatedData.data.mrp,
            sellingPrice: validatedData.data.sellingPrice,
            discountPercentage: validatedData.data.discountPercentage,
            description: encode(validatedData.data.description),
            media: validatedData.data.media,
        });
        await product.save();
        return response(true, 201, "Product created successfully", product);

    } catch (error) {
        return catchError(error);
    }

}