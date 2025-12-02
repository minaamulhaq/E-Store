import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";

import { catchError, response } from "@/lib/response";
import { categorySchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/category.model";

export async function POST(request) {
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
        });
        const validate = ValidationSchema.safeParse(payload);
        if (!validate.success) {
            return response(false, 400, "Invalid or missing parameters", validate.error.format());
        }
        const { name, slug } = validate.data;
        const existingCategory = await CategoryModel.findOne({ slug: slug });
        if (existingCategory) {
            return response(false, 400, "Category with this slug already exists", null);
        }
        const newCategory = new CategoryModel({
            name,
            slug,
        });
        await newCategory.save();
        return response(true, 201, "Category created successfully", newCategory);

    } catch (error) {
        console.log(error);
        return catchError(error);
    }
}