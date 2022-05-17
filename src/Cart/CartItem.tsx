import React from 'react';
import iconMinus from 'assets/icons/icon_minus.svg';
import iconPlus from 'assets/icons/icon_plus.svg';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Store/store';

import { routes } from 'routes';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { decrementQuantity, incrementQuantity, removeCartItem } from 'Store/slice/cartSlice';

export default function CartItem() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.Carts);
  const cartItemCount = useSelector((state: RootState) => state.cart.numberCart || 0);
  const cartQuantity = useSelector((state: RootState) => state.cart.Quantity || 0);

  const initialValue = 0;
  const GrandTotal = cart.reduce(
    (accumulator: number, current: { Price: number; Quantity: number }) =>
      accumulator + current.Price * current.Quantity + 40,
    initialValue
  );

  const deleteItem = async (productId: string) => {
    try {
      dispatch(removeCartItem(productId));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <ShoppingCartHeader />
        {cartQuantity > 1 && (
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
                {cart.map((el: any) => {
                  return (
                    <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5' key={el?.productId}>
                      <div className='flex w-2/5'>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                          <span className='font-bold text-sm'>{el?.ProductName}</span>
                          <span className='font-semibold hover:text-red-500 text-gray-500 text-xs'>
                            <button onClick={() => deleteItem(String(el.productId))}>Remove</button>
                          </span>
                        </div>
                      </div>
                      {/* Quantity section */}
                      <div className='flex justify-center w-1/5'>
                        <button onClick={() => dispatch(decrementQuantity({ ...el }))}>
                          <img src={iconMinus} alt='minus' />
                        </button>

                        <span className='mx-2 border text-center w-8'>{el.Quantity}</span>

                        <button onClick={() => dispatch(incrementQuantity({ ...el }))}>
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
                  <span className='font-semibold text-sm'>Items {cartItemCount}</span>
                </div>
                <div>
                  <div className='flex justify-between mt-10 mb-5'>
                    <span className='font-semibold text-sm'>Standard delivery charges</span>
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
        {cartQuantity && <div className='flex justify-center font-semibold pt-10 text-2xl'>Empty Shopping Cart</div>}
      </div>
    </>
  );
}
