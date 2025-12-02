import connectDB from "@/lib/connectionDB";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import UserModel from "@/models/user.model";

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
                { name: { $regex: globleFilters, $options: 'i' } },
                { email: { $regex: globleFilters, $options: 'i' } },
                { phone: { $regex: globleFilters, $options: 'i' } },
                { address: { $regex: globleFilters, $options: 'i' } },
                { isEmailVerified: { $regex: globleFilters, $options: 'i' } },
                { role: { $regex: globleFilters, $options: 'i' } },
            ]
        }

        filters.forEach(filter => {
            const { id, value } = filter;
            matchQuery[id] = { $regex: value, $options: 'i' };
        });

        let sortQuery = {};
        sorting.forEach(sort => {
            const { id, desc } = sort;
            sortQuery[id] = desc ? -1 : 1;
        });


        const agregatePipeline = [
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length > 0 ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    name: 1, email: 1, phone: 1, address: 1, isEmailVerified: 1, avatar: 1,

                    role: 1, createdAt: 1, updatedAt: 1, deletedAt: 1
                }
            },
        ]
        const getCustomer = await UserModel.aggregate(agregatePipeline);
        const totalCustomer = await UserModel.countDocuments(matchQuery);
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