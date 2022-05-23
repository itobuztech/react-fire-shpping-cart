import React, { useEffect, useState } from 'react';
import iconMinus from 'assets/icons/icon_minus.svg';
import iconPlus from 'assets/icons/icon_plus.svg';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, getDocs, increment, updateDoc } from 'firebase/firestore';

import { routes } from 'routes';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { db } from 'lib/firebase';
import { ProductListItem } from 'Interface/product-list-item.interface';
import { CartItemRow, CartItem } from 'Interface/CartItem.interface';
import Button from 'Components/Button';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemRow[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<any>();
  const initialValue = 0;
  const GrandTotal = cartItems.reduce(
    (accumulator: number, current: { Price: number; Quantity: number }) =>
      accumulator + current.Price * current.Quantity,
    initialValue
  );

  // delete cart item
  const deleteCartItem = async (id: string) => {
    const result = doc(db, 'cartItem', String(id));
    try {
      const item = await deleteDoc(result);
      setCartItems(cartItems.filter((items) => items.id !== id));
      console.log(item);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // get cartList
  const fetchData = async () => {
    const getData = await getDocs(collection(db, 'cartItem'));
    const $rows = getData.docs.map(async (i: any) => {
      const item = i.data() as CartItem;
      const productRef = doc(db, 'products', item.productId);
      const productItemDoc = await getDoc(productRef);
      const productItem = productItemDoc.data() as ProductListItem;
      return {
        ...item,
        ProductName: productItem.ProductName,
        Price: productItem.Price || 0,
        Total: productItem.Price * item.Quantity,
      };
    });
    const data = await Promise.all($rows);
    setCartItems(data);
  };

  useEffect(() => {
    fetchData();
  });

  // cart length
  useEffect(() => {
    const getCartItem = collection(db, 'cartItem');
    getDocs(getCartItem).then((item) => {
      const cartCount = item.size;
      setCartItemsCount(cartCount);
    });
  });

  // increment quantity
  const quantityIncrement = async (id: string) => {
    const cartRef = doc(db, 'cartItem', String(id));
    try {
      await updateDoc(cartRef, {
        Quantity: increment(1),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // decrement quantity
  const quantityDecrement = async (id: string) => {
    const cartRef = doc(db, 'cartItem', String(id));
    try {
      await updateDoc(cartRef, {
        Quantity: increment(-1),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <ShoppingCartHeader />
        {cartItemsCount >= 1 && (
          <div className='container mx-auto mt-10'>
            <div className='flex shadow-md my-10'>
              <div className='w-3/4 bg-gray-50 px-10 py-10'>
                {/* Cart header */}
                <div className='flex justify-between border-b pb-8'>
                  <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
                </div>
                {/* Cart header end */}

                {/* cart list header */}
                <div className='flex mt-10 mb-5'>
                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>Product Details</h3>
                  <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Quantity</h3>
                  <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Price</h3>
                  <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Total</h3>
                </div>
                {/* cart list header end */}

                {/* cart list item */}
                {cartItems.map((el) => {
                  return (
                    <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5' key={el?.productId}>
                      <div className='flex w-2/5'>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                          <span className='font-bold text-sm'>{el.ProductName}</span>
                          <span className='font-semibold hover:text-red-500 text-gray-500 text-xs'>
                            <button onClick={() => deleteCartItem(String(el?.id))}>Remove</button>
                          </span>
                        </div>
                      </div>
                      {/* Quantity section */}
                      <div className='flex justify-center w-1/5'>
                        <button onClick={() => quantityDecrement(el.id)}>
                          <img src={iconMinus} alt='minus' />
                        </button>

                        <span className='mx-2 border text-center w-8'>{el.Quantity}</span>

                        <button onClick={() => quantityIncrement(el.id)}>
                          <img src={iconPlus} alt='plus' />
                        </button>
                      </div>
                      {/* Quantity section end */}

                      {/* Price section */}
                      <span className='text-center w-1/5 font-semibold text-sm'>
                        <BiRupee className='absolute ml-12 mt-1' />
                        {el.Price}
                      </span>
                      <span className='text-center w-1/5 font-semibold text-sm'>
                        <BiRupee className='absolute ml-12 mt-1' />
                        {el.Quantity * el.Price}
                      </span>
                    </div>
                  );
                })}
                <Link to={routes.listScreen}>
                  {' '}
                  <div className='flex font-semibold text-indigo-600 text-sm mt-10'>Continue Shopping</div>
                </Link>
              </div>

              {/*Order summary section */}
              <div className='w-1/4 px-8 py-10 bg-gray-200'>
                <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
                <div className='flex justify-between mt-8 mb-5'>
                  <span className='font-semibold text-sm'>Items {cartItemsCount}</span>
                </div>
                <div></div>
                <div className='border-t mt-8'>
                  <div className='flex font-semibold justify-between py-6 text-'>
                    <span>Net Payable</span>
                    <div className='flex'>
                      <span className='text-sm mr-4'>
                        <BiRupee className='absolute mt-1' />
                      </span>
                      <span className='font-semibold text-sm'>{GrandTotal}</span>
                    </div>
                  </div>

                  <Link to={routes.checkoutScreen}>
                    {' '}
                    <button
                      className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm 
          text-white uppercase w-full'>
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {cartItemsCount < 1 && (
          <div>
          <div
            className='font-semibold text-3xl flex
         justify-center mt-8'>
            Empty Shopping Cart
            </div>
            <div className='flex justify-center mt-8'>
            <Link to={routes.listScreen}><Button>Back to Home</Button></Link>
            </div>
          </div>
         
        )}
      </div>
    </>
  );
}
