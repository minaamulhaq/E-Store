import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import userIcon from "@/public/assets/images/user.png";
export const DT_CATEGORY_COLS = [
    {
        accessorKey: 'name',
        header: 'Category Name',
    }, {
        accessorKey: 'slug',
        header: 'Slug',
    }
];
export const DT_PRODUCT_COLS = [{
    accessorKey: 'name',
    header: 'Product Name',
}, {
    accessorKey: 'sellingPrice',
    header: 'Selling Price',
}, {
    accessorKey: 'slug',
    header: 'Slug',
}
    , {
    accessorKey: 'category',
    header: 'Category',
}, {
    accessorKey: 'mrp',
    header: 'MRP',
},
{
    accessorKey: 'discountPercentage',
    header: 'Discount (%)',
},
];

export const DT_PRODUCT_VARIANT_COLS = [{
    accessorKey: 'product',
    header: 'Product Name',
}, {
    accessorKey: 'size',
    header: 'Size',
}, {
    accessorKey: 'color',
    header: 'Color',
}, {
    accessorKey: 'sku',
    header: 'SKU',
}, {
    accessorKey: 'sellingPrice',
    header: 'Selling Price',
}, {
    accessorKey: 'mrp',
    header: 'MRP',
}, {
    accessorKey: 'discountPercentage',
    header: 'Discount (%)',
},
];
export const DT_COUPAN_COLS = [
    {
        accessorKey: 'code',
        header: 'Coupan Code',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount (%)',
    },
    {
        accessorKey: 'minShoppingAmount',
        header: 'Min Shopping Amount',
    },
    {
        accessorKey: 'validity',
        header: 'Validity',
        Cell: ({ renderedCellValue }) => {
            return new Date() > new Date(renderedCellValue) ? <Chip label={dayjs(renderedCellValue).format('DD/MM/YYYY')} color="error" /> : <Chip label={dayjs(renderedCellValue).format('DD/MM/YYYY')} color="success" />
        },
    },
];
export const DT_CUSTOMER_COLS = [
    {
        accessorKey: 'avatar',
        header: 'Avatar',
        Cell: ({ renderedCellValue }) => {
            const avatar = renderedCellValue;

            console.log("avatar", avatar);
            const imageSrc = avatar ? avatar.url : userIcon.src;
            console.log("imageSrc", imageSrc);
            return (

                <Avatar>
                    <AvatarImage src={imageSrc} alt="Customer Avatar" />
                </Avatar>

            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Customer Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'isEmailVerified',
        header: 'Email Verified',
        Cell: ({ renderedCellValue }) => {
            return renderedCellValue ? <Chip label="Verified" color="success" /> : <Chip label="Not Verified" color="warning" />
        },

    }, {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    }

];
export const DT_REVIEW_COLS = [
    {
        accessorKey: 'product',
        header: 'Product Name',
    },
    {
        accessorKey: 'user',
        header: 'User Name',
    },
    {
        accessorKey: 'rating',
        header: 'Rating',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'review',
        header: 'Review',
    }
];