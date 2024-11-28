import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../../types';

const initialState: Invoice[] = [];

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoices: (state, action: PayloadAction<Invoice[]>) => {
      return [...state, ...action.payload];
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.findIndex((invoice) => invoice.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    updateInvoiceProduct: (state, action: PayloadAction<{ id: string; productName: string }>) => {
      const invoice = state.find((inv) => inv.id === action.payload.id);
      if (invoice) {
        invoice.productName = action.payload.productName;
      }
    },
  },
  // extraReducers: (builder) => {
  //   // Handle pending, fulfilled, and rejected states of the thunk here (if needed)
  // },
});


// Thunk action to check existing invoice and dispatch addInvoices if valid
export const checkAndAddInvoice = (data: any) => async (dispatch: any, getState: any) => {
  const invoicesFromStore = getState().invoices;

  // Check if invoice with the same serialNumber exists
  const existingInvoice = invoicesFromStore.find((invoice: any) => invoice.serialNumber === data.serial_number);

  if (existingInvoice) {
    // If it exists, display error message (e.g., using toast or any other means)
    return { error: 'File with this serial number and date already exists' };
  }

  // If no existing invoice, create a new invoice object
  const inv: any = {
    id: `${data.serial_number}-${Date.now()}`,
    serialNumber: data.serial_number,
    customerName: data.customer_name,
    productName: data.product_details.map((product: any) => product.name).join(", "),
    quantity: data.product_details.length,
    tax: data.tax_amount,
    totalAmount: data.total_amount,
    date: data.date,
  };

  // Dispatch action to add the invoice to the store
  dispatch(addInvoices([inv]));

  // Return success
  return { success: 'File processed successfully' };
};

export const { addInvoices, updateInvoice,updateInvoiceProduct } = invoicesSlice.actions;
export default invoicesSlice.reducer;
