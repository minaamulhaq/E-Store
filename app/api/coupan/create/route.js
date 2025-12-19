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
        const validatedData = formSchema.safeParse(payload);
        if (!validatedData.success) {
            return response(false, 400, "Invalid user Input");
        }
        const coupan = new CoupanModel({
            code: validatedData.data.code,
            discountPercentage: validatedData.data.discountPercentage,
            minShoppingAmount: validatedData.data.minShoppingAmount,
            validity: validatedData.data.validity,
        });

        await coupan.save();
        return response(true, 201, "Coupan created successfully", coupan);

    } catch (error) {
        return catchError(error);
    }

}