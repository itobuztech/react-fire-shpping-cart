import React, { useEffect, useState } from 'react';
import iconMinus from 'assets/icons/icon_minus.svg';
import iconPlus from 'assets/icons/icon_plus.svg';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { routes } from 'routes';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { db } from 'lib/firebase';
import { ProductListItem } from 'Interface/product-list-item.interface';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, selectCount } from 'Store/slice/cartSlice';

export default function CartItem() {
  const [cart, setCart] = useState<ProductListItem[]>([]);
  const [productList, setProductList] = useState<any>();
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const fetchCart = async () => {
    const getData = await getDocs(collection(db, 'cartItem'));
    const data = getData.docs.map((items) => items.data() as ProductListItem);
    setCart(data);
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const deleteProduct = async (uid: string) => {
    const result = doc(db, 'cartItem', uid);
    try {
      await deleteDoc(result);
      setProductList(productList.filter((items: any) => items.uid !== uid));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <ShoppingCartHeader />
        <div className='container mx-auto mt-10'>
          <div className='flex shadow-md my-10'>
            <div className='w-3/4 bg-gray-50 px-10 py-10'>
              {/* Cart header */}
              <div className='flex justify-between border-b pb-8'>
                <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
                <h2 className='font-semibold text-2xl'>2 Items</h2>
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
              {cart.map((el: any) => {
                return (
                  <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5' key={el?.productId}>
                    <div className='flex w-2/5'>
                      <div className='flex flex-col justify-between ml-4 flex-grow'>
                        <span className='font-bold text-sm'>{el?.ProductName}</span>
                        <span className='font-semibold hover:text-red-500 text-gray-500 text-xs'>
                          <button onClick={() => deleteProduct(String(el))}>Remove</button>
                        </span>
                      </div>
                    </div>
                    {/* Quantity section */}
                    <div className='flex justify-center w-1/5'>
                      <button onClick={() => dispatch(decrementQuantity())}>
                        <img src={iconMinus} alt='minus' />
                      </button>

                      <input className='mx-2 border text-center w-8' type='text' value={count} />

                      <button onClick={() => dispatch(incrementQuantity())}>
                        <img src={iconPlus} alt='plus' />
                      </button>
                    </div>
                    {/* Quantity section end */}

                    {/* Price section */}
                    <span className='text-center w-1/5 font-semibold text-sm'>
                      <BiRupee className='absolute ml-12 mt-1' />
                      {el?.Price}
                    </span>
                    <span className='text-center w-1/5 font-semibold text-sm'>
                      <BiRupee className='absolute ml-12 mt-1' />
                      {el?.Price}
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
              <div className='flex justify-between mt-10 mb-5'>
                <span className='font-semibold text-sm'>Items 2</span>
                <div className='flex'>
                  <span className='text-sm mr-4'>
                    <BiRupee className='absolute mt-1' />
                  </span>
                  <span className='font-semibold text-sm'>440</span>
                </div>
              </div>
              <div>
                <div className='flex justify-between mt-10 mb-5'>
                  <span className='font-semibold text-sm'>Delivery Charges</span>
                  <div className='flex'>
                    <span className='text-sm mr-4'>
                      <BiRupee className='absolute mt-1' />
                    </span>
                    <span className='font-semibold text-sm'>40</span>
                  </div>
                </div>
              </div>
              <div className='border-t mt-8'>
                <div className='flex font-semibold justify-between py-6 text-'>
                  <span>Total Amount</span>
                  <div className='flex'>
                    <span className='text-sm mr-4'>
                      <BiRupee className='absolute mt-1' />
                    </span>
                    <span className='font-semibold text-sm'>480</span>
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
      </div>
    </>
  );
}
