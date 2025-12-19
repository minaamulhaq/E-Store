import { isAuthenticated } from "@/lib/isAuthenticated";
import { catchError, response } from "@/lib/response";
import { reviewSchema } from "@/lib/zodSchema";
import ReviewModel from "@/models/review.model";



export async function POST(request) {
    const payload = await request.json();
    try {

        const auth = await isAuthenticated("user");
        if (!auth.isAuth) {
            return response(false, 401, "Unauthorized", null,);
        }

        const formSchema = reviewSchema.pick({
            productId: true,
            userId: true,
            rating: true,
            title: true,
            review: true,
        });
        const validatedData = formSchema.safeParse(payload);


        if (!validatedData.success) {
            return response(false, 400, "Invalid user Input");
        }



        const product = new ReviewModel({
            product: validatedData.data.productId,
            user: validatedData.data.userId,
            rating: validatedData.data.rating,
            title: validatedData.data.title,
            review: validatedData.data.review,
        });
        await product.save();
        return response(true, 201, "Product review added successfully", product);

    } catch (error) {
        return catchError(error);
    }

}