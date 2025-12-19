import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import ProductModel from "@/models/product.model";
import MediaModel from "@/models/media.model";
import ProductVariantModel from "@/models/productVariant.model";
import ReviewModel from "@/models/review.model";
export async function GET(request, { params }) {

    await connectDB();
    const getParasms = await params;
    const color = request.nextUrl.searchParams.get('color');
    const size = request.nextUrl.searchParams.get('size');
    const slug = await getParasms.slug;


    try {
        // Fetch product details from database based on slug
        const product = await ProductModel.findOne({ slug, deletedAt: null }).populate('media', 'secure_url').lean();
        if (!product) {
            return response(false, 404, "Product not found");

        }
        // Fetch product variant based on color and size
        let variantQuery = { product: product._id, deletedAt: null };
        if (color) {
            variantQuery.color = color;
        }
        if (size) {
            variantQuery.size = size;
        }
        const productVariant = await ProductVariantModel.findOne(variantQuery).populate('media', 'secure_url').lean();
        // colour and size options for the product
        const colorOptions = await ProductVariantModel.distinct('color', { product: product._id, deletedAt: null });
        const sizeOptions = await ProductVariantModel.aggregate([
            { $match: { product: product._id, deletedAt: null } },
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
        ])
        // get Reviews and ratings
        const getReviws = await ReviewModel.countDocuments({ product: product._id, deletedAt: null });

        const responseData = {
            product,
            variants: productVariant,
            colors: colorOptions,
            sizes: sizeOptions.map(item => item.size),
            reviewsCount: getReviws,
        };
        return response(true, 200, "Product details fetched successfully", responseData);

    } catch (error) {
        return catchError(error);
    }
}