import { createSlice } from '@reduxjs/toolkit';
import { CartInterface } from 'Interface/cart.interface';

const initProduct = {
  numberCart:0,
  Carts:[{
    id: '',
    title: '',
    quantity: 0,
    discountedPrice: 0,
    total: 0
  }],
  subTotal: 0,
  grandTotal: 0
};


const cartSlice = createSlice({
  name: 'cart',
  initialState: initProduct,
  reducers: {
    addToCart: (state, action) => {
      const item: CartInterface = {
        id: action.payload.id,
        quantity: 1,
        title: action.payload.title,
        productImage: '',
        discountedPrice: action.payload.discountedPrice,
        total: action.payload.discountedPrice,
        uid: action.payload
      };
      state.numberCart++;
      state.subTotal = item.total;
      state.Carts.push(item);
    },
    removeFromCart: (state, action) => {
      state.Carts = state.Carts.filter((item) => 
        item.id !== action.payload
      );
      state.numberCart--;
    },
    quantityIncrement: (state, action) => {
      state.Carts[action.payload].quantity++;
      state.Carts[action.payload].total =
      state.Carts[action.payload].quantity * state.Carts[action.payload].discountedPrice;
      state.subTotal = state.Carts[action.payload].total;
    },
    quantityDecrement: (state, action) => {
      state.Carts[action.payload].quantity--;
      state.Carts[action.payload].total =
      state.Carts[action.payload].quantity * state.Carts[action.payload].discountedPrice;
    }
  }
});

export const { addToCart, removeFromCart, quantityIncrement, quantityDecrement } = cartSlice.actions;

export default cartSlice.reducer;