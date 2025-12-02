import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    avatar: {
        url: {
            type: String,
            trim: true,
        },
        public_id: {
            type: String,
            trim: true,
        }

    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true,
    },

}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;