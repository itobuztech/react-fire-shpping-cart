import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Carts: [] as any,
  value: 1,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cart = {
        productId: action.payload.productId,
        ProductName: action.payload.ProductName,
        Quantity: 1,
        Price: action.payload.Price,
      };
      state.Carts.push(cart);
    },
    incrementQuantity: (state) => {
      state.value += 1;
    },
    decrementQuantity: (state) => {
      const quantity = state.value;
      if (quantity > 1) {
        state.value -= 1;
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export const selectCount = (state: { cart: { value: any } }) => state.cart.value;
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
