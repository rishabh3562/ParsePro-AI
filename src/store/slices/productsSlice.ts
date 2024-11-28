import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      console.log("state in product slice", state);
      console.log("action in product slice", action);
      return [...state, ...action.payload];
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
  // extraReducers: (builder) => {
  //   // handle pending, fulfilled, and rejected states if needed
  // },
});

// Thunk to check and add products
export const checkAndAddProduct =
  (data: any,) => async (dispatch: any, getState: any) => {
   const productData :any= data.product_details;
    const productsFromStore = getState().products;
    // console.log("productFromStore in thunk",productsFromStore)
    // console.log("productData in thunk",productData)
    // Check if product with the same name exists
    const existingProduct = productsFromStore.find(
      (product: any) => product.name === productData.name
    );

    if (existingProduct) {
      // return { error: 'Product with this name already exists' };
    }
    const newProduct: any = productData.map((product: any, index: number) => {
      const tax_by_calc = product.GST_amount
        ? product.GST_amount
        : product.GST_percentage
        ? (product.GST_percentage * product.unit_price * product.quantity) / 100
        : 0;

      return {
        id: `${data.serial_number}-${index}`,
        serialNumber: data.serial_number,
        customerName: data.customer_name,
        productName: product.name,
        quantity: product.quantity,
        unitPrice: product.unit_price,
        GSTPercentage: product.GST_percentage || 0,
        GSTAmount: tax_by_calc,
        totalAmount:
          product.quantity * product.unit_price +
          tax_by_calc -
          (product.discount || 0),
        discount: product.discount || 0,
        date: product.date,
      };
    });

    // Add new product
    // const newProduct = {
    //   id: `${productData.name}-${Date.now()}`,
    //   name: productData.name,
    //   price: productData.price,
    //   category: productData.category,
    // };
    console.log("newProduct in thunk", newProduct);
    dispatch(addProducts(newProduct));
    return { success: "Product added successfully" };
  };

export const { addProducts, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
