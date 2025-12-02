import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import ProductModel from "@/models/product.model";
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
                { description: { $regex: globleFilters, $options: 'i' } },
                { $expr: { $regexMatch: { input: { $toString: "$mrp" }, regex: globleFilters, options: "i" } } },
                { $expr: { $regexMatch: { input: { $toString: "$sellingPrice" }, regex: globleFilters, options: "i" } } },
                { $expr: { $regexMatch: { input: { $toString: "$discountPercentage" }, regex: globleFilters, options: "i" } } },
                { "categoryData.name": { $regex: globleFilters, $options: 'i' } },
            ]
        }

        filters.forEach(filter => {
            const { id, value } = filter;
            if (id === "category") {
                matchQuery["categoryData.name"] = { $regex: value, $options: 'i' }; // ✅ category filter
            } else if (id === "mrp" || id === "sellingPrice" || id === "discountPercentage") {

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
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            {
                $unwind: {
                    path: "$categoryData",
                    preserveNullAndEmptyArrays: true
                }
            },

            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length > 0 ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    name: 1,
                    description: 1,
                    sellingPrice: 1,
                    slug: 1,
                    discountPercentage: 1,
                    mrp: 1,
                    category: "$categoryData.name",
                    deletedAt: 1,
                    createdAt: 1,
                    updatedAt: 1,

                }
            },
        ];
        const productData = await ProductModel.aggregate(aggregatePipeline);
        const totalProducts = await ProductModel.countDocuments(matchQuery);
        return NextResponse.json({
            success: true,
            message: "Product data fetched successfully",
            data: productData,
            meta: {
                totalRowCount: totalProducts,
            }

        });
    } catch (error) {
        return catchError(error);
    }
}