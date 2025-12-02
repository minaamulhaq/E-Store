import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import CoupanModel from "@/models/coupan.model";

import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null);
        }
        await connectDB();
        // search product data and return response
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
                { name: { $regex: globleFilters, $options: 'i' } },
                { $expr: { $regexMatch: { input: { $toString: "$minShoppingAmount" }, regex: globleFilters, options: "i" } } },
                { $expr: { $regexMatch: { input: { $toString: "$discountPercentage" }, regex: globleFilters, options: "i" } } },

            ]
        }

        filters.forEach(filter => {
            const { id, value } = filter;
            if (id === "minShoppingAmount" || id === "discountPercentage") {

                matchQuery["$expr"] = { $regexMatch: { input: { $toString: `$${id}` }, regex: value, options: "i" } }; // ✅ numeric fields filter
            } else {
                matchQuery[id] = { $regex: value, $options: 'i' };
            }
        });


        let sortQuery = {};
        sorting.forEach(sort => {
            const { id, desc } = sort;
            sortQuery[id] = desc ? -1 : 1;
        });
        const aggregatePipeline = [

            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length > 0 ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    code: 1,
                    discountPercentage: 1,
                    minShoppingAmount: 1,
                    validity: 1,
                    deletedAt: 1,
                    createdAt: 1,
                    updatedAt: 1,
                }
            },
        ];
        const coupanData = await CoupanModel.aggregate(aggregatePipeline);
        const totalCoupons = await CoupanModel.countDocuments(matchQuery);
        return NextResponse.json({
            success: true,
            message: "coupan data fetched successfully",
            data: coupanData,
            meta: {
                totalRowCount: totalCoupons,
            }

        });
    } catch (error) {
        return catchError(error);
    }
}