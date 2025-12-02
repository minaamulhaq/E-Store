import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";

import { catchError, response } from "@/lib/response";
import { coupanSchema } from "@/lib/zodSchema";
import CoupanModel from "@/models/coupan.model";




export async function PUT(request) {

    try {
        const payload = await request.json();
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null,);
        }
        await connectDB();
        const ValidationSchema = coupanSchema.pick({
            _id: true,
            code: true,
            discountPercentage: true,
            minShoppingAmount: true,
            validity: true,
        });
        const validate = ValidationSchema.safeParse(payload);
        if (!validate.success) {
            return response(false, 400, "Invalid or missing parameters", validate.error);
        }
        const {
            _id,
            code,
            discountPercentage,
            minShoppingAmount,
            validity,

        } = validate.data;
        const existingProduct = await CoupanModel.findOne({ _id, deletedAt: null });
        if (!existingProduct) {
            return response(false, 404, "Product not found", null);
        }
        existingProduct.code = code;
        existingProduct.discountPercentage = discountPercentage;
        existingProduct.minShoppingAmount = minShoppingAmount;
        existingProduct.validity = validity;

        await existingProduct.save();
        return response(true, 200, "Product updated successfully", existingProduct);

    } catch (error) {
        console.log(error);
        return catchError(error);
    }
} 