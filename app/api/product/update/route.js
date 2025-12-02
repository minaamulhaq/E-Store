import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";

import { catchError, response } from "@/lib/response";
import { productSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";


export async function PUT(request) {
    try {
        const payload = await request.json();
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null,);
        }
        await connectDB();
        const ValidationSchema = productSchema.pick({
            _id: true,
            name: true,
            slug: true,
            description: true,
            category: true,
            media: true,
            sellingPrice: true,
            discountPercentage: true,
            mrp: true,
        })
        const validate = ValidationSchema.safeParse(payload);
        if (!validate.success) {
            return response(false, 400, "Invalid or missing parameters", validate.error.format());
        }
        const {
            _id,
            name,
            slug,
            description,
            category,
            media,
            sellingPrice,
            discountPercentage,
            mrp

        } = validate.data;
        const existingProduct = await ProductModel.findOne({ _id, deletedAt: null });
        if (!existingProduct) {
            return response(false, 404, "Product not found", null);
        }
        existingProduct.name = name;
        existingProduct.slug = slug;
        existingProduct.description = description;
        existingProduct.category = category;
        existingProduct.media = media;
        existingProduct.sellingPrice = sellingPrice;
        existingProduct.discountPercentage = discountPercentage;
        existingProduct.mrp = mrp;

        await existingProduct.save();
        return response(true, 200, "Product updated successfully", existingProduct);

    } catch (error) {
        console.log(error);
        return catchError(error);
    }
} 