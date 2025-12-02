import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import { authSchema } from "@/lib/zodSchema";
import MediaModel from "@/models/media.model";
import { isValidObjectId } from "mongoose";


export async function PUT(request) {
    try {
        const { isAuth } = await isAuthenticated("admin");
        if (!isAuth) {
            return response(false, 401, "Unauthorized");
        }
        await connectDB();
        const payload = await request.json();
        const schema = authSchema.pick({
            _id: true,
            alt: true,
            title: true,
        })
        const parsed = schema.safeParse(payload);

        if (!parsed.success) {
            return response(false, 400, "Invalid data", parsed.error);
        }
        const { _id, alt, title } = parsed.data;
        if (!isValidObjectId(_id)) {
            return response(false, 400, "Invalid ID");
        }
        const media = await MediaModel.findOne({ _id, deletedAt: null });
        if (!media) {
            return response(false, 404, "Media not found");
        }
        media.alt = alt;
        media.title = title;
        await media.save();
        return response(true, 200, "Media updated successfully");

    } catch (error) {
        return catchError(error);
    }
}