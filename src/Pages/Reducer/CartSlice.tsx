/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ICart } from 'Interface/cart.interface';
import products from '../../Pages/ProductList/ProductList';


const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItem:[] as ICart[],
    quantity: 0,
    totalAmount: 0,
 
    
  },
  reducers: {
    addToCart: (state, { payload }: { payload: ICart }) => {
      const isItemExist = state.cartItem.find((item) =>
        item.id === payload.id
        
      );
     
      if (!isItemExist) {
        state.cartItem = [...state.cartItem, { ...payload, quantity: 1, }];
        console.log(state.cartItem);
      } else {
        state.cartItem = state.cartItem.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1, price:item.price };
          } else {
            return item;
          }
        });
      }
      state.quantity++;
      payload.price;
      state.totalAmount += payload.price;
    },
  

  }
});

export default CartSlice;
export const cartSliceAction = CartSlice.actions;
