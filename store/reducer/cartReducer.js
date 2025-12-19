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
            const existProduct = state.products.findIndex(
                (product) => product.variantId === payload.variantId && product.productId === payload.productId

            );
            if (existProduct < 0) {
                state.products.push(payload);
                state.count += 1;
            }
        },
        IncreaseQuantity: (state, action) => {
            const { productId, variantId } = action.payload;
            const existProduct = state.products.findIndex(
                (product) => product.variantId === variantId && product.productId === productId)
            if (existProduct >= 0) {
                state.products[existProduct].quantity += 1;
            }

        },
        DecreaseQuantity: (state, action) => {
            const { productId, variantId } = action.payload;
            const existProduct = state.products.findIndex(
                (product) => product.variantId === variantId && product.productId === productId)
            if (existProduct >= 0 && state.products[existProduct].quantity > 1) {
                state.products[existProduct].quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.products.filter((product) => product.variantId !== action.payload.variantId && product.productId !== action.payload.productId);
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