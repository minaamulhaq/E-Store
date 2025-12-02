import cloudinary from "@/lib/cloudnary";
import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import MediaModel from "@/models/media.model";

export async function POST(request) {
    const payload = await request.json();
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null,);
        }
        await connectDB();
        if (!Array.isArray(payload) || payload.length === 0) {
            return response(false, 400, "Invalid payload, expected a non-empty array", null);
        }
        const newMedia = await MediaModel.insertMany(payload);
        return response(true, 201, "Media created successfully", newMedia);
    } catch (error) {
        if (payload && payload.length > 0) {
            const publicIds = payload.map(item => item.public_id);
            try {
                await cloudinary.api.delete_resources(publicIds);
            } catch (deleteError) {
                error.cloudinary = deleteError;
            }
        }

        return catchError(error);
    }
}