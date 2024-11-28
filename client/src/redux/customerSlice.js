import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customers: [],
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        updateCustomer: (state, action) => {
            const index = state.customers.findIndex(customer => customer.name === action.payload.name);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
    },
});

export const { setCustomers, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
