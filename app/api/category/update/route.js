import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";

import { catchError, response } from "@/lib/response";
import { categorySchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/category.model";

export async function PUT(request) {
    try {
        const payload = await request.json();
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null,);
        }
        await connectDB();
        const ValidationSchema = categorySchema.pick({
            name: true,
            slug: true,
            _id: true,
        });
        const validate = ValidationSchema.safeParse(payload);
        if (!validate.success) {
            return response(false, 400, "Invalid or missing parameters", validate.error.format());
        }
        const { _id, name, slug } = validate.data;
        const existingCategory = await CategoryModel.findOne({ _id, deletedAt: null });
        if (!existingCategory) {
            return response(false, 404, "Category not found", null);
        }
        existingCategory.name = name;
        existingCategory.slug = slug;
        await existingCategory.save();
        return response(true, 200, "Category updated successfully", existingCategory);

    } catch (error) {
        console.log(error);
        return catchError(error);
    }
} 