import mongoose, { Schema } from "mongoose";
const coupanSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    minShoppingAmount: {
        type: Number,
        required: true,
    },
    validity: {
        type: Date,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true,
    },
}, { timestamps: true });


const CoupanModel = mongoose.models.Coupan || mongoose.model("Coupan", coupanSchema);
export default CoupanModel;