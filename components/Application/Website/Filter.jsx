import axios from 'axios'
import React from 'react'

const Filter = async () => {
    const { data: categories } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/get-category`);
    //console.log(categories);
    return (
        <div>
            Filter Component
        </div>
    )
}

export default Filter
