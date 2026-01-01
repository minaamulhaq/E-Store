import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import { coupanValidation } from "@/lib/zodSchema";
import CoupanModel from "@/models/coupan.model";

export async function POST(request) {
    try {
        await connectDB();
        const playload = await request.json();
        const coupanFormSchema = coupanValidation.pick({ code: true, minShoppingAmount: true });
        const parsedData = coupanFormSchema.safeParse(playload);
        if (!parsedData.success) {
            return response(false, 400, "Invalid Coupen Data");
        }
        // Check if coupan exists and is valid
        const { code, minShoppingAmount } = parsedData.data;
        const existingCoupan = await CoupanModel.findOne({ code: code }).lean();
        if (!existingCoupan) {
            return response(false, 404, "Coupan not found");
        }
        const currentDate = new Date();
        if (currentDate > existingCoupan.validity) {
            return response(false, 400, "Coupan has expired");
        }
        if (minShoppingAmount < existingCoupan.minShoppingAmount) {
            return response(false, 400, `Minimum shopping amount for this coupan is ${existingCoupan.minShoppingAmount}`);
        }

        return response(true, 200, "Coupan applied successfully", { discountPercentage: existingCoupan.discountPercentage });
    } catch (error) {
        return catchError(error);
    }
}