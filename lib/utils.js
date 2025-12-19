import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const productSize = [
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
  { label: '3XL', value: '3XL' },
  { label: '4XL', value: '4XL' },
  { label: '5XL', value: '5XL' }
];
export const sortOptions = [
  { label: "Default Sorting", value: "default_sorting" },
  { label: "Accending Order", value: "asc" },
  { label: "Decending Order", value: "desc" },
  { label: "Price - Low to High", value: "price_low_high" },
  { label: "Price - High to Low", value: "price_high_low" }
];

export const PRODUCT_DETAILS = (slug) => slug ? `/product/${slug}` : '/product/';


