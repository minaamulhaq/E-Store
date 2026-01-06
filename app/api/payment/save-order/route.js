import { catchError, response } from '@/lib/response';
import { orderSchema } from '@/lib/zodSchema';
import CoupanModel from '@/models/coupan.model';
import ProductVariantModel from '@/models/productVariant.model';
import OrderModel from '@/models/order.model';
import ProductModel from '@/models/product.model';
import connectDB from '@/lib/connectionDB';


export async function POST(request) {
    try {
        const orderData = await request.json();
        await connectDB();
        const products = orderData.products.map(prod => ({
            productId: prod.productId,
            variantId: prod.variantId,
            name: prod.name,
            quantity: prod.quantity,
            mrp: prod.mrp,
            sellingPrice: prod.sellingPrice,
        }));
        const varificationData = await Promise.all(
            products.map(async (item) => {
                const varient = await ProductVariantModel.findById(item.variantId).populate('product').lean();
                if (!varient) return null;
                if (varient) {
                    return {
                        productId: varient.product._id,
                        variantId: varient._id,
                        name: varient.product.name,
                        sellingPrice: varient.sellingPrice,
                        mrp: varient.mrp,
                        quantity: item.quantity,

                    }
                }
            })
        )
        const filteredVarificationData = varificationData.filter(item => item !== null);
        const filteredProducts = filteredVarificationData.map(items => ({
            productId: items.productId,
            variantId: items.variantId,
            name: items.name,
            quantity: items.quantity,
            mrp: items.mrp,
            sellingPrice: items.sellingPrice,
        }))
        if (!orderData.products || orderData.products.length === 0) {
            return response(400, "Cart is empty");
        }



        const orderForm =
        {
            name: orderData.name,
            email: orderData.email,
            phone: orderData.phone,
            country: orderData.country,
            state: orderData.state,
            city: orderData.city,
            zip: orderData.zip,
            landmark: orderData.landmark,
            ordernote: orderData.ordernote,
            userId: orderData.userId,

        }

        const orderFormSchema = orderSchema.pick({
            userId: true,
            name: true,
            email: true,
            phone: true,
            country: true,
            state: true,
            city: true,
            zip: true,
            landmark: true,
            ordernote: true,

        })
        const validatedOrderData = orderFormSchema.safeParse({
            ...orderForm,
        });
        // Validate required fields
        if (!validatedOrderData.success) {
            return response(400, "Validation Error", validatedOrderData.error.errors || "Invalid data");
        }

        // calculate totals
        let subTotal = 0;
        let discount = 0;
        varificationData.forEach(item => {
            subTotal += item.mrp * item.quantity;
            discount += (item.mrp - item.sellingPrice) * item.quantity;
        });
        let coupanData;
        const coupan = orderData.coupan;
        if (coupan) {
            // apply coupan logic here
            const coupanObj = await CoupanModel.findOne({ code: coupan });
            if (coupanObj) {
                // apply coupan discount logic
                coupanData = coupanObj;
            }
        }

        let coupanDiscount = 0;
        if (coupanData && subTotal >= coupanData.minShoppingAmount) {
            const discountAmount = (subTotal * coupanData.discountPercentage) / 100;
            coupanDiscount = discountAmount;
        }
        const totalAmount = subTotal - discount - coupanDiscount;

        // save order to db
        const newOrder = new OrderModel({
            ...validatedOrderData.data,
            products: filteredProducts,
            subTotal,
            discount,
            coupanDiscount,
            totalAmount,
        });
        await newOrder.save();

        return response(200, "Order placed successfully", { orderId: newOrder._id });




    } catch (error) {
        console.log("Error in saving order:", error);
        return catchError(error);
    }
}

// userId
// name
// email
// phone
// country
// state
// city
// zip
// landmark
// ordernot
// products
// subTotal
// discount
// coupanDiscount
// totalAmount
// orderStatus
// deliveredAt