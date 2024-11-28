import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [],
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoices: (state, action) => {
            state.invoices = action.payload;
        },
        updateInvoice: (state, action) => {
            const index = state.invoices.findIndex(invoice => invoice.serialNumber === action.payload.serialNumber);
            if (index !== -1) {
                state.invoices[index] = action.payload;
            }
        },
    },
});

export const { setInvoices, updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
