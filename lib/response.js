const { NextResponse } = require("next/server")

export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({
        success,
        message,
        data,
        statusCode
    })
}
export const catchError = (error, customMessage) => {
    //handle dublicate key error
    if (error.code && error.code === 11000) {
        const field = Object.keys(error.keyPattern).join(", ");
        error.message = `Dublicate field : ${field}. This field must be unique.`;
    }
    let errorObj = {};
    if (process.env.NODE_ENV === "development") {
        errorObj = {
            message: error.message,
            error,
        }
    } else {
        errorObj = {
            message: customMessage || "Internal Server Error",
        }

    }
    return response(false, error.code, errorObj.message);

}
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}