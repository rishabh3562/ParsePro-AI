import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product => product.name === action.payload.name);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
    },
});

export const { setProducts, updateProduct } = productSlice.actions;
export default productSlice.reducer;
