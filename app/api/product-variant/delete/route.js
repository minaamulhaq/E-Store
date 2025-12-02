import cloudinary from "@/lib/cloudnary";
import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { response } from "@/lib/response";
import { catchError } from "@/lib/response";
import ProductVariantModel from "@/models/productVariant.model";


export async function PUT(request) {
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized");
        }
        await connectDB();
        const payload = await request.json();
        const ids = payload.id || []; // array of ids
        const deleteType = payload.deleteType; // 'SD' or 'PD'

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return response(false, 400, "Empty ids List");
        }
        const Product = await ProductVariantModel.find({ _id: { $in: ids } });
        if (Product.length === 0) {
            return response(false, 404, "No Product found for the provided ids");
        }
        if (!['SD', 'RSD'].includes(deleteType)) {
            return response(false, 400, "Invalid deleteType. Must be 'SD' or 'PD'");
        }
        if (deleteType === 'SD') {
            // Soft Delete: Set isDeleted to true
            await ProductVariantModel.updateMany(
                { _id: { $in: ids } },
                { $set: { isDeleted: true, deletedAt: new Date().toISOString() } }
            );
            return response(true, 200, "Product soft deleted successfully");
        } else {
            await ProductVariantModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } })
            return response(true, 200, "Product restored successfully");
        }




    } catch (error) {
        return catchError(error);
    }

}
export async function DELETE(request) {

    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized");
        }
        await connectDB();
        const payload = await request.json();
        const ids = payload.id || []; // array of ids
        const deleteType = payload.deleteType; // 'SD' or 'PD'

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return response(false, 400, "Empty ids List");
        }
        const Product = await ProductVariantModel.find({ _id: { $in: ids } }).lean();
        if (Product.length === 0) {
            return response(false, 404, "No Product found for the provided ids");
        }
        if (deleteType !== 'PD') {
            return response(false, 400, "Invalid deleteType. Must be 'SD' or 'PD'");
        }

        // Permanent Delete: Remove documents from the database
        await ProductVariantModel.deleteMany({ _id: { $in: ids } }).lean();


        const publicIds = Product.map(m => m.public_id);

        return response(true, 200, "Product permanently deleted successfully");



    } catch (error) {
        return catchError(error);
    }

}