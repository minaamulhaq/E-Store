import cloudinary from "@/lib/cloudnary";
import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { response } from "@/lib/response";
import { catchError } from "@/lib/response";
import UserModel from "@/models/user.model";



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
        const User = await UserModel.find({ _id: { $in: ids } });
        if (User.length === 0) {
            return response(false, 404, "No User found for the provided ids");
        }
        if (!['SD', 'RSD'].includes(deleteType)) {
            return response(false, 400, "Invalid deleteType. Must be 'SD' or 'PD'");
        }
        if (deleteType === 'SD') {
            // Soft Delete: Set isDeleted to true
            await UserModel.updateMany(
                { _id: { $in: ids } },
                { $set: { deletedAt: new Date().toISOString() } }
            );
            return response(true, 200, "User soft deleted successfully");
        } else {
            await UserModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } })
            return response(true, 200, "User restored successfully");
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
        const User = await UserModel.find({ _id: { $in: ids } }).lean();
        if (User.length === 0) {
            return response(false, 404, "No User found for the provided ids");
        }
        if (deleteType !== 'PD') {
            return response(false, 400, "Invalid deleteType. Must be 'SD' or 'PD'");
        }

        // Permanent Delete: Remove documents from the database
        await UserModel.deleteMany({ _id: { $in: ids } }).lean();


        return response(true, 200, "User permanently deleted successfully");



    } catch (error) {
        return catchError(error);
    }

}