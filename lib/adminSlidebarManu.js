import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";

export const adminSlidebarManu = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: AiOutlineDashboard
    },

    {
        title: "Category",
        url: "#",
        icon: BiCategory,
        submenu: [
            {
                title: "Add Category",
                url: "/admin/category/add"
            },
            {
                title: "All Category",
                url: "/admin/category"
            },
        ]
    },
    {
        title: "Products",
        url: "#",
        icon: IoShirtOutline,
        submenu: [
            {
                title: "Add Product",
                url: "/admin/product/add"
            },
            {
                title: "All Products",
                url: "/admin/product"
            },
            {
                title: "All Variants",
                url: "/admin/product-variant"
            },
            {
                title: "Add Variants",
                url: "/admin/product-variant/add"
            },
        ]
    },
    {
        title: "Coupons",
        url: "#",
        icon: RiCoupon2Line,
        submenu: [
            {
                title: "Add Coupon",
                url: "/admin/coupan/add"
            },
            {
                title: "All Coupons",
                url: "/admin/coupan"
            },
        ]
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: MdOutlineShoppingBag,
    },

    {
        title: "Customers",
        url: "/admin/customers",
        icon: LuUserRound,
    },
    {
        title: "Ratings & Reviews",
        url: "/admin/reviews",
        icon: IoMdStarOutline,
    },
    {
        title: "Media",
        url: "/admin/media",
        icon: MdOutlinePermMedia,
    },
]