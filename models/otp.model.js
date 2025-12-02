import mongoose, { Schema } from "mongoose";
const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: () => { Date.now() + 10 * 60 * 1000 },
    }
}, { timestamps: true });
otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const OTPModel = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
export default OTPModel;