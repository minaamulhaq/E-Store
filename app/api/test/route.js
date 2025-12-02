import connectDB from "@/lib/connectionDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();
    return NextResponse.json({ message: "Database connected successfully" });

}