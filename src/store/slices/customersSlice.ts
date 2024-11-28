import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types';

const initialState: Customer[] = [];

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomers: (state, action: PayloadAction<Customer[]>) => {
       console.log("state in Customer slice",state)
      console.log("action in Customer slice",action)
      return [...state, ...action.payload];
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.findIndex((customer) => customer.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addCustomers, updateCustomer } = customersSlice.actions;
export default customersSlice.reducer;

// Thunk to check and add customer
export const checkAndAddCustomer = (customerData: any) => async (dispatch: any, getState: any) => {
  const customersFromStore = getState().customers;
  console.log("customersFromStore in thunk",customersFromStore)
  console.log("customerData in thunk",customerData)
  
  // Check if customer with the same name exists
  const existingCustomer = customersFromStore.find(
    (customer: any) => customer.serialNumber === customerData.serialNumber
  );

  if (existingCustomer) {
    return { error: 'Customer with this name already exists' };
  }
  const newCustomer: any = [
          {
            serialNumber: customerData.serial_number,
            customerName: customerData.customer_name,
            phoneNumber: customerData.customer_phone_number || "N/A",
            address: customerData.customer_address ? customerData.customer_address.replace(/\n/g, ", ").trim() : "N/A",
            totalAmount: customerData.total_amount,
            bankDetails: customerData.bank_details || {},
            taxableAmount: customerData.taxable_amount,
            taxAmount: customerData.tax_amount,
            lastPurchaseDate: customerData.date,
          },
        ];
console.log("newCustomer in thunk",newCustomer)
  dispatch(addCustomers(newCustomer));
  return { success: 'Customer added successfully' };
};
