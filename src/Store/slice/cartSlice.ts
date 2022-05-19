import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from 'Interface/CartItem.interface';

const initialState = {
  Carts: [] as CartItem[],
  numberCart: 0,
  Total: 0,
  Quantity: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: any }) => {
      const productExit = state.Carts.find((item: { productId: any }) => item.productId === payload.productId);

      if (!productExit) {
        state.Carts = [...state.Carts, { ...payload, Quantity: 1 }];
      }
      state.numberCart++;
      state.Total += payload.Price;
    },
    incrementQuantity: (state, { payload }: { payload: any }) => {
      state.Carts = state.Carts.map((item) => {
        if (item.productId === payload.productId) {
          return { ...item, Quantity: item.Quantity + 1 };
        } else {
          return item;
        }
      });
      state.Quantity++;
      state.Total += payload.price;
    },
    decrementQuantity: (state, { payload }: { payload: any }) => {
      state.Carts = state.Carts.map((item) => {
        if (item.productId === payload.productId && state.Quantity > 1) {
          return { ...item, Quantity: item.Quantity - 1 };
        } else {
          return item;
        }
      });
      state.Quantity--;
      state.numberCart--;
      state.Total -= payload.price;
    },
    removeCartItem: (state, action) => {
      state.Carts = state.Carts.filter((item: any) => item.productId !== action.payload);
      state.numberCart--;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeCartItem } = cartSlice.actions;
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
