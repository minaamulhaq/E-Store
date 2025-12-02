import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";

import { catchError, response } from "@/lib/response";
import { productSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/productVariant.model";


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
            product: true,
            sku: true,
            color: true,
            size: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true,
        })
        const validate = ValidationSchema.safeParse(payload);
        if (!validate.success) {
            return response(false, 400, "Invalid or missing parameters", validate.error);
        }
        const {
            _id,
            product,
            sku,
            color,
            size,
            mrp,
            sellingPrice,
            discountPercentage,
            media,

        } = validate.data;
        const existingProduct = await ProductVariantModel.findOne({ _id, deletedAt: null });
        if (!existingProduct) {
            return response(false, 404, "Product not found", null);
        }
        existingProduct.product = product;
        existingProduct.sku = sku;
        existingProduct.color = color;
        existingProduct.size = size;
        existingProduct.mrp = mrp;
        existingProduct.sellingPrice = sellingPrice;
        existingProduct.discountPercentage = discountPercentage;
        existingProduct.media = media;

        await existingProduct.save();
        return response(true, 200, "Product variant updated successfully", existingProduct);

    } catch (error) {
        console.log(error);
        return catchError(error);
    }
} 