import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import ReviewModel from "@/models/review.model";
import mongoose from "mongoose";

export async function GET(request) {
    try {
        await connectDB();
        const searchParams = request.nextUrl.searchParams;
        const productId = searchParams.get('productId');

        if (!productId) {
            return catchError(new Error("Product ID is required"));
        }

        const review = await ReviewModel.aggregate([
            { $match: { product: new mongoose.Types.ObjectId(productId), deletedAt: null } },
            {
                $group: {
                    _id: "$rating",

                    count: { $sum: 1 }
                }

            },
            { $sort: { _id: 1 } },

        ]);
        const totalReviews = review.reduce((sum, item) => sum + item.count, 0);
        const averageRating = totalReviews > 0 ? review.reduce((sum, item) => sum + (item._id * item.count), 0) / totalReviews : 0.0;
        const rating = review.reduce((acc, r) => {
            acc[r._id] = r.count;
            return acc;
        }, {})
        const ratingPercentage = review.reduce((acc, r) => {
            acc[r._id] = ((r.count / totalReviews) * 100).toFixed(1);
            return acc;
        }, {})



        return response(true, 200, "Review details fetched successfully", { rating, totalReviews, averageRating: averageRating.toFixed(1), ratingPercentage });

    } catch (error) {
        return catchError(error);
    }
}