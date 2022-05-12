import { createSlice } from '@reduxjs/toolkit';
import { CartInterface } from 'Interface/cart.interface';

const initProduct = {
  numberCart:0,
  Carts:[{
    id: '',
    title: '',
    quantity: 0,
    discountedPrice: 0
  }]
};


const cartSlice = createSlice({
  name: 'cart',
  initialState: initProduct,
  reducers: {
    addToCart: (state, action) => {
      const item: CartInterface = action.payload;
      state.Carts.push(item);
      console.log(item);
    },
    removeFromCart: (state, action) => {
      state.Carts = state.Carts.filter((item) => 
        item.id !== action.payload
      );
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;