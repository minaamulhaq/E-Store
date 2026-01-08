import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
        products: [],
    },
    reducers: {
        addInToCart: (state, action) => {
            const payload = action.payload;
            const existProduct = state.products.find(
                (product) => product.variantId === payload.variantId && product.productId === payload.productId

            );
            if (!existProduct) {
                state.products.push(payload);
                state.count++;
            }
        },
        IncreaseQuantity: (state, action) => {

            const { productId, variantId } = action.payload;

            const existProduct = state.products.find(
                (product) => product.variantId === variantId && product.productId === productId)
            if (existProduct) {
                existProduct.quantity += 1;
            }

        },
        DecreaseQuantity: (state, action) => {

            const { productId, variantId } = action.payload;

            const existProduct = state.products.find(
                (product) => product.variantId === variantId && product.productId === productId)
            if (existProduct && existProduct.quantity > 1) {
                existProduct.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            console.log("IncreaseQuantity action:", action);
            const { productId, variantId } = action.payload;
            console.log("IncreaseQuantity payload:", action.payload);
            console.log("Current state before removal:", productId, variantId, state);
            // const exists = state.products.find(
            //     (p) => p.productId === productId && p.variantId === variantId
            // );
            // console.log("Product exists in cart:", exists);

            state.products = state.products.filter((product) => product.variantId != action.payload.variantId);
            state.count -= 1;

        },
        clearCart: (state) => {
            state.products = [];
            state.count = 0;
        }
    }
});
export const { addInToCart,
    IncreaseQuantity,
    DecreaseQuantity,
    removeFromCart,
    clearCart } = cartSlice.actions;

export default cartSlice.reducer;