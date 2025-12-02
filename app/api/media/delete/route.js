import cloudinary from "@/lib/cloudnary";
import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { response } from "@/lib/response";
import MediaModel from "@/models/media.model";
import mongoose from "mongoose";

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
        const media = await MediaModel.find({ _id: { $in: ids } });
        if (media.length === 0) {
            return response(false, 404, "No media found for the provided ids");
        }
        if (!['SD', 'RSD'].includes(deleteType)) {
            return response(false, 400, "Invalid deleteType. Must be 'SD' or 'PD'");
        }
        if (deleteType === 'SD') {
            // Soft Delete: Set isDeleted to true
            await MediaModel.updateMany(
                { _id: { $in: ids } },
                { $set: { isDeleted: true, deletedAt: new Date().toISOString() } }
            );
            return response(true, 200, "Media soft deleted successfully");
        } else {
            await MediaModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } })
            return response(true, 200, "Media restored successfully");
        }




    } catch (error) {
        return catchError(error);
    }

}
export async function DELETE(request) {
    const session = await mongoose.startSession();
    session.startTransaction();
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
        const media = await MediaModel.find({ _id: { $in: ids } }).session(session).lean();
        if (media.length === 0) {
            return response(false, 404, "No media found for the provided ids");
        }
        if (deleteType !== 'PD') {
            return response(false, 400, "Invalid deleteType. Must be 'SD' or 'PD'");
        }

        // Permanent Delete: Remove documents from the database
        await MediaModel.deleteMany({ _id: { $in: ids } }).session(session).lean();
        const publicIds = media.map(m => m.public_id);
        try {

            await cloudinary.api.delete_resources(publicIds);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return response(false, 500, "Error deleting media from Cloudinary");
        }
        await session.commitTransaction();
        session.endSession();

        return response(true, 200, "Media permanently deleted successfully");



    } catch (error) {
        return catchError(error);
    }

}