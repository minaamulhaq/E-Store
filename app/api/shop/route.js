import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";

export async function GET(request) {
    await connectDB();
    try {

        const searchParams = request.nextUrl.searchParams;
        // Fetch products from database based on searchParams
        const parseArray = (value) =>
            value ? value.split(",") : [];


        const size = parseArray(searchParams.get('size'));
        const category = parseArray(searchParams.get('category'));
        const color = parseArray(searchParams.get('color'));

        const minPrice = parseInt(searchParams.get('minPrice')) || 0;
        const maxPrice = parseInt(searchParams.get('maxPrice')) || 1000000;
        const sortBy = searchParams.get('sortBy') || 'default_sorting';
        const limit = parseInt(searchParams.get('limit')) || 6;
        const page = parseInt(searchParams.get('page')) || 0;
        const search = searchParams.get('q') || '';


        const skip = page * limit;

        let sorting = {};
        if (sortBy === 'default_sorting') sorting = { createdAt: -1 };
        else if (sortBy === 'price_high_low') sorting = { sellingPrice: -1 };
        else if (sortBy === 'price_low_high') sorting = { sellingPrice: 1 };
        else if (sortBy === 'asc') sorting = { name: 1 };
        else if (sortBy === 'desc') sorting = { name: -1 };


        let categoryId = [];
        if (category) {
            // Fetch category ID from CategoryModel based on slug
            const categoryDoc = await CategoryModel.find({ slug: category, deletedAt: null }).select('_id').lean();
            console.log(categoryDoc);
            if (categoryDoc) {
                categoryId = categoryDoc.map(cat => cat._id);
            }
        }

        let matchQuery = { deletedAt: null, };
        if (categoryId.length > 0) {
            matchQuery.category = { $in: categoryId };
        }

        matchQuery.sellingPrice = { $gte: minPrice, $lte: maxPrice };
        if (search) {
            matchQuery.name = { $regex: search, $options: 'i' };
        }
        const products = await ProductModel.aggregate([
            { $match: matchQuery },

            {
                $lookup: {
                    from: "productvariants",
                    localField: "_id",
                    foreignField: "product",
                    as: "variants"
                }
            },
            {
                $addFields: {
                    variants: {
                        $filter: {
                            input: "$variants",
                            as: "variant",
                            cond: {
                                $and: [
                                    size.length > 0 ? { $in: ["$$variant.size", size] } : { $literal: true },
                                    color.length > 0 ? { $in: ["$$variant.color", color] } : { $literal: true },
                                    categoryId.length > 0 ? { $in: ["$category", categoryId] } : { $literal: true },
                                    { $gte: ["$$variant.sellingPrice", minPrice] },
                                    { $lte: ["$$variant.sellingPrice", maxPrice] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $match: { variants: { $ne: [] } }
            },
            {
                $lookup: {
                    from: "media",
                    localField: "media",
                    foreignField: "_id",
                    as: "media"
                }
            },
            { $sort: sorting },
            { $skip: skip },
            { $limit: limit + 1 },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    category: 1,
                    mrp: 1,
                    sellingPrice: 1,
                    discountPercentage: 1,
                    media: {
                        _id: 1,
                        secure_url: 1,
                        public_id: 1,
                        alt: 1,
                    },
                    description: 1,
                    variants: {
                        color: 1,
                        size: 1,
                        mrp: 1,
                        sellingPrice: 1,
                        discountPercentage: 1,
                        sku: 1,
                    },
                }
            }
        ]);
        let NextPage = null;
        if (products.length > limit) {
            NextPage = page + 1;
            products.pop();
        }



        return response(true, 200, 'Products fetched successfully', { products, NextPage });

    } catch (error) {
        return catchError(error);
    }
}
