import connectDB from '@/lib/connectionDB';
import OrderModel from '@/models/order.model';

import UserModel from '@/models/user.model';
import ProductModel from '@/models/product.model';
import ProductVariantModel from '@/models/productVariant.model';
import MediaModel from '@/models/media.model';
import { catchError, response } from '@/lib/response';
export async function GET(request, { params }) {
    const { id } = await params;
    try {
        await connectDB();
        if (!id) {
            return response(false, 400, "Order ID is required");
        }
        const order = await OrderModel.findById(id).populate('userId', 'name email').populate('products.productId', 'name slug').populate({
            path: 'products.variantId',
            populate: { path: 'media' },
        }).lean();
        if (!order) {
            return response(false, 404, "Order not found");
        }
        return response(true, 200, "Order found", order);

    } catch (error) {
        catchError(error);
    }
}