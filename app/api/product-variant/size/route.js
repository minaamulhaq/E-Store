import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import ProductVariantModel from "@/models/productVariant.model";


export async function GET() {
    try {
        await connectDB();
        const sizes = await ProductVariantModel.aggregate([
            // 1. Group to get distinct sizes
            {
                $group: {
                    _id: "$size"
                }
            },

            // 2. Add a sort index based on your custom array order
            {
                $addFields: {
                    sortOrder: {
                        $indexOfArray: [
                            ["XS", "S", "M", "L", "XL", "2XL", "3XL",], // Your desired order
                            "$_id"
                        ]
                    }
                }
            },

            // 3. Sort by the index we just calculated
            {
                $sort: { sortOrder: 1 }
            },

            // 4. (Optional) Project to clean up the result format
            {
                $project: {
                    _id: 0,
                    size: "$_id"
                }
            }
        ]);
        if (!sizes) {
            return response(true, 200, "No sizes found", []);
        }
        let formattedSizes = sizes.map(item => item.size);
        return response(true, 200, "Sizes fetched successfully", formattedSizes);
    } catch (error) {
        console.log("Error in GET /product-variant/size:", error);
        console.error("Error fetching sizes:", error);
        return catchError(error);
    }

}