import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart
const initialState = [];

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      addToCart: (state, action) => {
        const item = state.find(product => product.id === action.payload.id);
        if (item) {
          item.quantity += 1;
        } else {
          state.push({ ...action.payload, quantity: 1 });
        }
      },
      removeFromCart: (state, action) => {
        return state.filter(product => product.id !== action.payload.id);
      },
      updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.find(product => product.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    }
  });
  
  export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
  export default cartSlice.reducer;
  
