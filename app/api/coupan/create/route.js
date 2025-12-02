import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import { coupanSchema } from "@/lib/zodSchema";
import CoupanModel from "@/models/coupan.model";


export async function POST(request) {
    const payload = await request.json();
    try {
        const auth = await isAuthenticated("admin");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized Access");
        }


        const formSchema = coupanSchema.pick({
            code: true,
            discountPercentage: true,
            minShoppingAmount: true,
            validity: true,
        });
        const validatedData = formSchema.parse(payload);

        const coupan = new CoupanModel({
            code: validatedData.code,
            discountPercentage: validatedData.discountPercentage,
            minShoppingAmount: validatedData.minShoppingAmount,
            validity: validatedData.validity,
        });

        await coupan.save();
        return response(true, 201, "Coupan created successfully", coupan);

    } catch (error) {
        return catchError(error);
    }

}