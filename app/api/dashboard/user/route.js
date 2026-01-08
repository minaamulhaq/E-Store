import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import OrderModel from "@/models/order.model";
import UserModel from '@/models/user.model';
import ProductModel from '@/models/product.model';
import ProductVariantModel from '@/models/productVariant.model';
import MediaModel from '@/models/media.model';
import connectDB from "@/lib/connectionDB";

export async function GET(request) {
    try {
        await connectDB();
        const auth = await isAuthenticated("user");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized Access");
        }
        const userId = auth.user;
        const recentOrders = await OrderModel.find({ userId: userId }).populate('userId', 'name email').populate('products.productId', 'name slug').populate({
            path: 'products.variantId',
            populate: { path: 'media' },
        }).limit(5).lean();
        const totalOrders = await OrderModel.countDocuments({ userId: userId });

        console.log("Fetching orders for user ID:", userId);
        return response(true, 200, "User orders fetched successfully", {
            recentOrders,
            totalOrders,
        });

    } catch (error) {
        return catchError(error);
    }
}