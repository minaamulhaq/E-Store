import React, { useEffect, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import ImagePlace from '@/public/assets/images/img-placeholder.webp'
import { removeFromCart } from '@/store/reducer/cartReducer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [Open, setOpen] = useState(false)
    const [totalAmount, settotalAmount] = useState(0);
    const [totalDiscount, settotalDiscount] = useState(0);
    useEffect(() => {
        let products = cart.products;
        const amount = products.reduce((acc, item) => acc + (item.sellingPrice * item.quantity), 0);
        settotalAmount(amount);
        const discount = products.reduce((acc, item) => acc + ((item.mrp - item.sellingPrice) * item.quantity), 0);
        settotalDiscount(discount);
    }, [cart])
    return (

        <Sheet open={Open} onOpenChange={setOpen}>
            <SheetTrigger className="relative">
                <BsCart2
                    onClick={() => { setOpen(!Open) }}
                    className='text-gray-500 hover:text-primary cursor-pointer'
                    size={25}
                />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{cart.count}</span>
            </SheetTrigger>
            <SheetContent className="gap-0">
                <SheetHeader className="py-2">
                    <SheetTitle className={`text-2xl`}>My Cart </SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <div className='h-[calc(100vh-40px)]'>
                    <div className='h-[calc(100%-120px)] overflow-auto pb-2' >
                        {cart.count === 0 && <div className='flex flex-col items-center justify-center h-full'>
                            <BsCart2 size={50} className='text-gray-400' />
                            <p className='text-gray-500 mt-4'>Your cart is empty</p>
                        </div>}

                        {cart.products.map((items, index) => {
                            console.log("cart item:", items);
                            return (
                                <div key={items.variantId
                                } className="flex justify-between items-center gap-4 mb-4 border-b px-4 pb-4">
                                    <div className='flex items-center gap-4'>
                                        <Image src={items.media || ImagePlace.src} alt={items.name} width={50} height={50}
                                            className='h-20 w-20 rounded border' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg mb-1'>{items.name}</h3>
                                        <p className='text-gray-500'>{items.size}/ {items.color}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => dispatch(removeFromCart({ variantId: items.variantId, productId: items.productId }))}
                                            type='button' className='text-red-500 underline underline-offset-1 mb-2 hover:underline-offset-2 cursor-pointer'>
                                            Remove
                                        </button>
                                        <p className='font-semibold'>{items.quantity} x ${items.sellingPrice}</p>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                    <div className="h-28 border-t pt-2 px-2">
                        <h2 className='flex text-center justify-between items-center text-lg  font-semibold'> <span>Subtotal :</span> <span>${totalAmount.toFixed(2)}</span></h2>
                        <h2 className='flex text-center justify-between items-center text-lg  font-semibold'> <span>Discount :</span> <span>${totalDiscount.toFixed(2)}</span></h2>
                        <div className='flex mt-1'>
                            <Button className="w-[200px]" asChild variant={"secondary"} onClick={() => { setOpen(!Open) }}>
                                <Link href="/cart">View Cart</Link>
                            </Button>
                            <Button className="w-[200px] ml-2" asChild onClick={() => { setOpen(!Open) }}>
                                {cart.count ? <Link href="/checkout">Checkout</Link> : <Link href="/shop">Shop Now</Link>}
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Cart
