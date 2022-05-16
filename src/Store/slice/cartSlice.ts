import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Carts: [] as any,
  numberCart: 0,
  Total: 0,
  subTotal: 0,
  Quantity: 1,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: any }) => {
      const cart = {
        productId: payload.productId,
        ProductName: payload.ProductName,
        Quantity: 1,
        Price: payload.Price,
      };
      state.Carts.push(cart);
      state.numberCart++;
      state.Total += payload.Price * state.Quantity;
      state.subTotal += payload.Total;
    },
    incrementQuantity: (state, { payload }: { payload: any }) => {
      state.Carts = state.Carts.map((item: { productId: any; Quantity: number }) => {
        if (item.productId === payload.productId) {
          return { Quantity: item.Quantity + 1 };
        } else {
          return item;
        }
      });
      state.Quantity++;
      state.Total += payload.Price * state.Quantity;
    },
    decrementQuantity: (state) => {
      const quantity = state.Quantity;
      if (quantity > 1) {
        state.Quantity -= 1;
      }
    },
    removeCartItem: (state, action) => {
      state.Carts = state.Carts.filter((item: any) => item.productId !== action.payload);
      state.numberCart--;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeCartItem } = cartSlice.actions;
export const selectCount = (state: { cart: { Quantity: any } }) => state.cart.Quantity;
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
