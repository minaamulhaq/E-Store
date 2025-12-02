import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import ReviewModel from "@/models/review.model";


import { NextResponse } from "next/server";

export async function GET(request) {
    try {

        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null);
        }
        await connectDB();
        const searchParams = request.nextUrl.searchParams

        const start = parseInt(searchParams.get('start') || 0, 10);
        const size = parseInt(searchParams.get('size') || 10, 10);
        const filters = JSON.parse(searchParams.get('filters') || "[]")
        const globleFilters = searchParams.get('globalFilter') || "";
        const sorting = JSON.parse(searchParams.get('sorting') || "[]")
        const deleteType = searchParams.get('deleteType') || "SD"

        let matchQuery = {};
        if (deleteType === "SD") {
            matchQuery = { deletedAt: null }
        } else if (deleteType === "PD") {
            matchQuery = { deletedAt: { $ne: null } }
        }
        if (globleFilters) {
            matchQuery["$or"] = [
                { "productData.name": { $regex: globleFilters, $options: 'i' } },
                { "userData.name": { $regex: globleFilters, $options: 'i' } },
                { title: { $regex: globleFilters, $options: 'i' } },
                { review: { $regex: globleFilters, $options: 'i' } },
                { rating: { $regexMatch: { input: { $toString: "$rating" }, regex: globleFilters, options: 'i' } } },
            ]
        }

        filters.forEach(filter => {
            const { id, value } = filter;
            if (id === "rating") {
                matchQuery["$expr"] = { $regexMatch: { input: { $toString: `$${id}` }, regex: value, options: "i" } }; // ✅ numeric fields filter
            } else if (id === "product") {
                matchQuery["productData.name"] = { $regex: value, $options: 'i' }; // ✅ product filter
            } else if (id === "user") {
                matchQuery["userData.name"] = { $regex: value, $options: 'i' }; // ✅ user filter
            } else {
                matchQuery[id] = { $regex: value, $options: 'i' };
            }
        });

        let sortQuery = {};
        sorting.forEach(sort => {
            const { id, desc } = sort;
            sortQuery[id] = desc ? -1 : 1;
        });


        const agregatePipeline = [
            {
                $Lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userData"
                }
            },
            { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length > 0 ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    product: "$productData.name",
                    user: "$userData.name",
                    rating: 1,
                    title: 1,
                    review: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            },
        ]
        const getCustomer = await ReviewModel.aggregate(agregatePipeline);
        const totalCustomer = await ReviewModel.countDocuments(matchQuery);
        return NextResponse.json({
            data: getCustomer,
            success: true,
            message: "Customer fetched successfully",
            meta: {
                totalRowCount: totalCustomer,
            }
        })

    } catch (error) {
        return catchError(error)
    }
}