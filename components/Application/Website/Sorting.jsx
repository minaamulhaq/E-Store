import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { sortOptions } from '@/lib/utils'
import { IoFilter } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
const Sorting = ({ limit, setlimit, sorting, setSorting, mobileFilterOpen, setMobileFilterOpen }) => {
    return (
        <div className='flex justify-between items-center flex-wrap gap-2 p-4 bg-gray-50'>
            <Button type="button" variant={"outline"} className={`lg:hidden`} onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
                <IoFilter />
                Filter
            </Button>
            <ul className='flex items-center gap-4'>
                <li className='font-semibold'>Show:</li>
                {[6, 12, 24, 48].map((size) => (
                    <li key={size}>
                        <button
                            type='button'
                            className={`${limit === size ? 'w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white text-sm' : ''} cursor-pointer `}
                            onClick={() => setlimit(size)}
                        >
                            {size}
                        </button>
                    </li>
                ))}
            </ul>

            <Select value={sorting} onValueChange={(value) => setSorting(value)}>
                <SelectTrigger className="md:w-[180px] w-full bg-white">
                    <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((option) => (
                        <SelectItem key={option.value} className={`text-sm`}
                            value={option.value}>{option.label}</SelectItem>
                    ))}


                </SelectContent>
            </Select>

        </div>
    )
}

export default Sorting
