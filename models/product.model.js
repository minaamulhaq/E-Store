import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    media: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: true,
        }
    ],
    description: {
        type: String,

    },
    deletedAt: {
        type: Date,
        default: null,
        index: true,
    },
}, { timestamps: true });
productSchema.index({ category: 1 });
const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default ProductModel;