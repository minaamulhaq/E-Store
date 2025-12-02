import { jwtVerify } from "jose";

import { cookies } from "next/headers";

export const isAuthenticated = async (role) => {
    try {
        const cookieStore = await cookies();
        if (!cookieStore.has("AccessToken")) {
            return {
                isAuth: false,
            }
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = cookieStore.get("AccessToken").value;
        const { payload } = await jwtVerify(token, secret);
        if (payload.role !== role) {
            return {
                isAuth: false,
            }
        }
        return {
            isAuth: true,
            user: payload._id,
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return {
            isAuth: false,
        }
    }
}
