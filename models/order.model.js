import { orderStatusOptions } from '@/lib/utils';
import mongoose, { Schema } from 'mongoose';
const orderSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    landmark: { type: String },
    ordernote: { type: String },
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
            variantId: { type: mongoose.Types.ObjectId, required: true, ref: 'ProductVariant' },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            mrp: { type: Number, required: true },
            sellingPrice: { type: Number, required: true },

        }
    ],
    subTotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    coupanDiscount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: orderStatusOptions,
        default: "Pending",
    },
    deliveredAt: {
        type: Date, default: null,
        index: true,

    },

}, { timestamps: true });
const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default OrderModel;