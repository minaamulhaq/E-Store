"use client"
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { ButtonLoading } from '../ButtonLoading'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Filter = () => {
    const searchParams = useSearchParams();
    const { data: categories } = useFetch('api/category/get-category');
    const { data: sizeData } = useFetch('api/product-variant/size');
    const { data: colorData } = useFetch('api/product-variant/color');
    const [priceFilter, setpriceFilter] = useState({ min: 0, max: 3000 });
    // console.log(categories, sizeData, colorData);
    const [SelectedCategory, setSelectedCategory] = useState([]);
    const [SelectedSize, setSelectedSize] = useState([]);
    const [SelectedColor, setSelectedColor] = useState([]);
    const urlSearchparams = new URLSearchParams(searchParams.toString());
    const router = useRouter();
    const handelCategoryFilter = (categorySlug) => {
        let newCategory = [...SelectedCategory];
        if (newCategory.includes(categorySlug)) {
            newCategory = newCategory.filter(cat => cat !== categorySlug);
        } else {
            newCategory.push(categorySlug);
        }
        setSelectedCategory(newCategory);
        newCategory.length > 0 ? urlSearchparams.set('category', newCategory.join(',')) : urlSearchparams.delete('category');
        router.push(`/shop?${urlSearchparams.toString()}`)
    }
    //console.log(urlSearchparams.toString());
    //console.log(searchParams);
    useEffect(() => {
        searchParams.get('category') ? setSelectedCategory(searchParams.get('category').split(',')) : setSelectedCategory([]);
        searchParams.get('color') ? setSelectedColor(searchParams.get('color').split(',')) : setSelectedColor([]);
        searchParams.get('size') ? setSelectedSize(searchParams.get('size').split(',')) : setSelectedSize([]);

    }, [searchParams])


    const handelPriceChange = (value) => {

        setpriceFilter({ min: value[0], max: value[1] });

    }
    const handelSizeFilter = (size) => {
        let newSize = [...SelectedSize];
        if (newSize.includes(size)) {
            newSize = newSize.filter(s => s !== size);
        } else {
            newSize.push(size);
        }
        setSelectedSize(newSize);
        newSize.length > 0 ? urlSearchparams.set('size', newSize.join(',')) : urlSearchparams.delete('size');
        router.push(`/shop?${urlSearchparams.toString()}`)
    }
    const HandelColorFilter = (color) => {
        let newColor = [...SelectedColor];
        if (newColor.includes(color)) {
            newColor = newColor.filter(c => c !== color);
        } else {
            newColor.push(color);
        }
        setSelectedColor(newColor);
        newColor.length > 0 ? urlSearchparams.set('color', newColor.join(',')) : urlSearchparams.delete('color');
        router.push(`/shop?${urlSearchparams.toString()}`)
    }
    const HandelPriceFilter = () => {
        urlSearchparams.set('minPrice', priceFilter.min);
        urlSearchparams.set('maxPrice', priceFilter.max);
        router.push(`/shop?${urlSearchparams.toString()}`)
    }

    return (
        <div>
            {searchParams.size > 0 &&
                <Button type="button" className={`w-full cursor-pointer`} asChild variant={"destructive"}>
                    <Link href={`/shop`} >
                        Clear Filter
                    </Link>

                </Button>
            }
            <Accordion type="multiple" defaultValue={['1', '2', '3', '4']}>
                <AccordionItem value="1">
                    <AccordionTrigger className={`uppercase font-semibold hover:no-underline cursor-pointer`}>Category</AccordionTrigger>
                    <AccordionContent className={`max-h-48 overflow-auto`}>
                        <ul>
                            {categories && categories.data.map((category) => (
                                <li key={category._id} onClick={() => handelCategoryFilter(category.slug)} className='mb-1' >
                                    <label className="flex items-center gap-2 space-x-3 ">
                                        <Checkbox
                                            checked={SelectedCategory.includes(category.slug)}
                                            className="hover:cursor-pointer" />
                                        {category.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                    <AccordionTrigger className={`uppercase font-semibold hover:no-underline cursor-pointer`}>Size</AccordionTrigger>
                    <AccordionContent className={`max-h-48 overflow-auto`}>
                        <ul>
                            {sizeData && sizeData.data.map((size, index) => (
                                <li key={index} onClick={() => handelSizeFilter(size)} className='mb-1'>
                                    <label className="flex items-center gap-2 space-x-3">
                                        <Checkbox
                                            checked={SelectedSize.includes(size)}
                                            className="hover:cursor-pointer" />
                                        <span>{size}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3">
                    <AccordionTrigger className={`uppercase font-semibold hover:no-underline cursor-pointer`}>Color</AccordionTrigger>
                    <AccordionContent className={`max-h-48 overflow-auto`}>
                        <ul>
                            {colorData && colorData.data.map((color, index) => (
                                <li key={index} onClick={() => HandelColorFilter(color)} className='mb-1'>
                                    <label className="flex items-center gap-2 space-x-3">
                                        <Checkbox
                                            checked={SelectedColor.includes(color)}
                                            className="hover:cursor-pointer" />
                                        <span>{color}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="4">
                    <AccordionTrigger className={`uppercase font-semibold hover:no-underline cursor-pointer`}>Price</AccordionTrigger>
                    <AccordionContent className={`max-h-48 overflow-auto`}>
                        <Slider className={`py-3`}
                            defaultValue={[0, 3000]}
                            max={3000} onValueChange={handelPriceChange} step={1} />
                        <div className='flex justify-between items-center'>
                            <span>${priceFilter.min}</span>
                            <span>${priceFilter.max}</span>
                        </div>
                        <div className='mt-2'>
                            <ButtonLoading
                                type="button"
                                text="Filter Price"
                                className="rounded-full cursor-pointer"
                                onClick={HandelPriceFilter}
                                loading={false}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Filter
