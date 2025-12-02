import { z } from "zod";

export const authSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long")
        .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/\d/, "Must contain a number")
        .regex(/[!@#\$%\^&\*\(\)\-_=\+\[\]\{\};:'",<>\.?\/\\`~]/, "Must contain a special character")
        .regex(/^\S*$/, "Must not contain spaces"),

    otp: z.string()
        .trim()
        .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
    _id: z.string().min(3, "_id is required"),
    alt: z.string().min(3, "Alt is required"),
    title: z.string().min(3, "Title is required"),
    slug: z.string().min(3, "Slug is required"),

});

export const categorySchema = z.object({
    name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters"),

    slug: z
        .string()
        .nonempty("Slug is required")
        .min(3, "Slug must be at least 3 characters"),
    _id: z.string().min(3, "_id is required"),
});
export const productSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters"),
    slug: z
        .string()
        .nonempty("Slug is required")
        .min(3, "Slug must be at least 3 characters"),
    category: z
        .string()
        .nonempty("Category is required")
        .min(3, "Category must be at least 3 characters"),
    mrp: z.union([
        z.number({ invalid_type_error: "MRP must be a number" })
            .nonnegative("MRP must be non-negative")
            .transform((val) => Number(val)).refine((val) => val > 0, {
                message: "MRP must be positive",
            }),
        z.string().regex(/^\d+(\.\d+)?$/, "MRP must be a valid number").transform((val) => Number(val)).refine((val) => val > 0, {
            message: "MRP must be positive",
        }),
    ]),
    sellingPrice: z.union([
        z.number({ invalid_type_error: "Selling Price must be a number" })
            .nonnegative("Selling Price must be non-negative")
            .transform((val) => Number(val)).refine((val) => val > 0, {
                message: "Selling Price must be positive",
            }),
        z.string().regex(/^\d+(\.\d+)?$/, "Selling Price must be a valid number").transform((val) => Number(val)).refine((val) => val > 0, {
            message: "Selling Price must be positive",
        }),
    ]),
    discountPercentage: z.union([
        z.number({ invalid_type_error: "Discount Percentage must be a number" })
            .min(0, "Discount Percentage cannot be negative")
            .max(100, "Discount Percentage cannot exceed 100"),
        z.string().regex(/^\d+(\.\d+)?$/, "Discount Percentage must be a valid number").transform((val) => Number(val)).refine((val) => val >= 0 && val <= 100, {
            message: "Discount Percentage must be between 0 and 100",
        }),
    ]),
    description: z.string().min(3, "Description must be at least 3 characters"),

    _id: z.string().min(3, "_id is required"),
    media: z.array(z.string()),
    product: z.string().min(3, "Product is required"),
    sku: z.string().min(3, "SKU is required"),
    color: z.string().min(1, "Color is required"),
    size: z.string().min(1, "Size is required"),
});
export const coupanSchema = z.object({
    code: z
        .string()
        .min(3, "Code must be at least 3 characters long")
        .max(50, "Code must be at most 50 characters long")
        .regex(/^[A-Za-z0-9_-]+$/, "Code can only contain letters, numbers, underscores, and hyphens"),
    discountPercentage: z.union([
        z.number({ invalid_type_error: "Discount Percentage must be a number" })
            .min(0, "Discount Percentage cannot be negative")
            .max(100, "Discount Percentage cannot exceed 100"),
        z.string().regex(/^\d+(\.\d+)?$/, "Discount Percentage must be a valid number").transform((val) => Number(val)).refine((val) => val >= 0 && val <= 100, {
            message: "Discount Percentage must be between 0 and 100",
        }),
    ]),
    minShoppingAmount: z.union([
        z.number({ invalid_type_error: "Selling Price must be a number" })
            .nonnegative("Selling Price must be non-negative")
            .transform((val) => Number(val)).refine((val) => val > 0, {
                message: "Selling Price must be positive",
            }),
        z.string().regex(/^\d+(\.\d+)?$/, "Selling Price must be a valid number").transform((val) => Number(val)).refine((val) => val > 0, {
            message: "Selling Price must be positive",
        }),
    ]),
    validity: z.coerce.date(),
    _id: z.string().min(3, "_id is required"),
});