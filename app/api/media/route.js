import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { response } from "@/lib/response";
import MediaModel from "@/models/media.model";

export async function GET(request) {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
        return response(false, 401, "Unauthorized", null);
    }
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"), 10) || 0;
    const limit = parseInt(searchParams.get("limit"), 10) || 10;
    const deleteType = searchParams.get("deleteType");
    let filter = {};
    if (deleteType === "SD") {
        filter = { deletedAt: null }
    } else {
        filter = { deletedAt: { $ne: null } };
    }
    try {
        const total = await MediaModel.countDocuments(filter);
        const media = await MediaModel.find(filter)
            .skip(page * limit)
            .limit(limit)
            .sort({ createdAt: -1 }).lean();
        return response(true, 200, "Media fetched successfully", { media, hasMore: (total > page * limit + limit) });
    } catch (error) {
        return response(false, 500, "Server Error", null, error);
    }
}