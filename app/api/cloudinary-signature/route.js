import cloudinary from "@/lib/cloudnary";
import { catchError, response } from "@/lib/response";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();
        // console.log("Payload received:", payload);

        // Cloudinary sends `paramsToSign` from the widget
        const { paramsToSign } = payload;

        if (!paramsToSign) {
            return response(false, 400, "Missing parameters to sign", null);
        }

        // Generate the signature
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );

        return NextResponse.json({
            signature,
        });
    } catch (error) {
        return catchError(error);
    }
}
