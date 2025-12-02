import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";
import UserModel from "@/models/user.model";

export async function GET(request) {
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized Access");
        }
        await connectDB();
        const [product, category, customer] = await Promise.all([
            ProductModel.countDocuments({ deletedAt: null }),
            CategoryModel.countDocuments({ deletedAt: null }),
            UserModel.countDocuments({ deletedAt: null }),
        ]);
        return response(true, 200, "Counts fetched successfully", {
            product,
            category,
            customer,
        });
    } catch (error) {
        return catchError(error);
    }
}