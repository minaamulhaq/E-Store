import connectDB from "@/lib/connectionDB";
import ReviewModel from "@/models/review.model";
import UserModel from "@/models/user.model";
import ProductModel from "@/models/product.model";
import mongoose from "mongoose";
import { catchError, response } from "@/lib/response";
export async function GET(request) {
    try {
        await connectDB();
        const searchParams = request.nextUrl.searchParams
        const productId = searchParams.get('productId');
        const page = parseInt(searchParams.get('page')) || 0;
        const limit = parseInt(searchParams.get('limit')) || 10;

        const skip = page * limit;
        let matchQuery = {
            deletedAt: null,
            product: new mongoose.Types.ObjectId(productId)

        };

        const agregatePipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userData"
                },

            },
            {
                $unwind: { path: "$userData", preserveNullAndEmptyArrays: true }
            },
            {
                $match: matchQuery
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit + 1 },
            {
                $project: {
                    _id: 1,
                    reviewedBy: "$userData.name",
                    title: 1,
                    review: 1,
                    avatar: "$userData.avatar",
                    rating: 1,
                    createdAt: 1
                }
            }

        ]
        const reviews = await ReviewModel.aggregate(agregatePipeline);
        const totalReviews = await ReviewModel.countDocuments(matchQuery);
        let nextPage = null;
        if (reviews.length > limit) {

            nextPage = page + 1;
            reviews.pop();
        }
        return response(true, 200, "Reviews fetched successfully", { reviews, nextPage, totalReviews });


    } catch (error) {
        return catchError(error);

    }
}