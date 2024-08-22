import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart
const initialState = [];

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      setCart: (state, action) => {
        state.splice(0, state.length, ...action.payload);
      },
      addToCart: (state, action) => {
        const item = state.find(product => product.productId === action.payload.productId);
        if (item) {
          item.quantity += 1;
        } else {
          state.push({ ...action.payload, quantity: 1 });
        }
      },
      removeFromCart: (state, action) => {
        return state.filter(product => product.productId !== action.payload.productId);
      },
      updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.find(product => product.productId === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    }
  });
  
  export const { addToCart, removeFromCart, updateQuantity,setCart } = cartSlice.actions;
  export default cartSlice.reducer;
  
