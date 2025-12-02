import connectDB from "@/lib/connectionDB";
import { catchError, response } from "@/lib/response";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        await connectDB();

        // Get the cookie store and delete the AccessToken
        const cookieStore = await cookies();
        cookieStore.delete("AccessToken");

        return response(true, 200, "Logged out successfully", null);
    } catch (error) {
        return catchError(error);
    }
}
