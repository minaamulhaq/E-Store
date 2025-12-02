import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true,
    },
}, { timestamps: true });


const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default ReviewModel;