import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiRupee } from 'react-icons/bi';
import { v4 as uuids4 } from 'uuid';

import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import TextInputField from 'Components/TextInputField';
import { UserDetails } from 'Interface/user-details.interface';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { CartItem, CartItemRow } from 'Interface/CartItem.interface';
import { ProductListItem } from 'Interface/product-list-item.interface';

export default function CheckoutScreen() {
  const [cartItemsCount, setCartItemsCount] = useState<any>();
  const [cartItems, setCartItems] = useState<CartItemRow[]>([]);
  const id = uuids4();

  const UserDetailsSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required.'),
    email: yup.string().trim().required('Email address is required').email('Enter valid email address'),
    phoneNumber: yup.string().trim().required('Phone number is required.'),
    address: yup.string().trim().required('Address is required.'),
    city: yup.string().trim().required('City is required.'),
    country: yup.string().trim().required('Country is required.'),
    pinCode: yup.string().trim().required('PinCode is required.'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserDetails>({
    resolver: yupResolver(UserDetailsSchema),
  });

  const initialValue = 0;
  const GrandTotal = cartItems.reduce(
    (accumulator: number, current: { Price: number; Quantity: number }) =>
      accumulator + 40 + current.Price * current.Quantity,
    initialValue
  );

  // cart length
  useEffect(() => {
    const getCartItem = collection(db, 'cartItem');
    getDocs(getCartItem).then((item) => {
      const cartCount = item.size;
      setCartItemsCount(cartCount);
    });
  });

  const onSubmit = async (value: UserDetails) => {
      const database = collection(db, 'OrderDetails');
      const data = await addDoc(database, {
        order_id: id,
        name: value.name,
        email: value.email,
        phoneNumber: value.phoneNumber,
        address: value.address,
        city: value.city,
        country: value.country,
        pinCode: value.pinCode,
      });
      reset();
      console.log(data);
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
  }, []);

  return (
    <>
      <ShoppingCartHeader />
      <div className='min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-2 pr-6'>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              <div className='pb-4 font-medium'>Contact Information</div>

              {/* Email  */}
              <div className='pb-3'>
                <TextInputField type='email' placeholder='Email address' register={register('email')} />
              </div>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              {/* Email End */}

              {/* Phone number  */}
              <div className='pb-3'>
                <TextInputField type='text' placeholder='Phone number' register={register('phoneNumber')} />
              </div>
              <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
              {/* Phone number End  */}

              <div className='pb-4 font-medium'>Shipping Address</div>

              {/* Name  */}
              <div className='pb-3'>
                <TextInputField type='text' placeholder='Full name' register={register('name')} />
              </div>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              {/* Name End  */}

              {/* Address  */}
              <div>
                <TextInputField type='text' placeholder='Address' register={register('address')} />
              </div>
              <div className='pt-2'>
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
              </div>
              {/* Address End  */}

              {/* City  */}
              <div>
                <TextInputField type='text' placeholder='City' register={register('city')} />
              </div>
              <div className='pt-2'>
                <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
              </div>
              {/* City End  */}

              {/* PinCode  */}
              <div>
                <TextInputField type='text' placeholder='PinCode' register={register('pinCode')} />
              </div>
              <div className='pt-2'>
                <FormErrorMessage>{errors.pinCode?.message}</FormErrorMessage>
              </div>
              {/* PinCode End  */}
              <div className='flex items-center pt-2'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label className='ml-2 block text-sm text-gray-900'>Save this information for next time</label>
              </div>
            </div>
            <div className='flex justify-center'>
              <Button>Continue</Button>
            </div>
          </form>
        </div>
        {/*Order summary section */}
        <div className='w-1/4 px-8'>
          <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
          <div className='flex justify-between mt-10 mb-5'>
            <span className='font-semibold text-sm'>Items {cartItemsCount}</span>
          </div>
          <div>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm'>Shipping Charges</span>
              <div className='flex'>
                <span className='text-sm mr-4'>
                  <BiRupee className='absolute mt-1' />
                </span>
                <span className='font-semibold text-sm'>40</span>
              </div>
            </div>
          </div>
          <div className='border-t border-b mt-8'>
            <div className='flex font-semibold justify-between py-6 text-md'>
              <span>Total Payable</span>
              <div className='flex'>
                <span className='text-sm mr-4'>
                  <BiRupee className='absolute mt-1' />
                </span>
                <span className='font-semibold text-sm'>{GrandTotal}</span>
              </div>
            </div>
          </div>
          {/*Order summary section end */}
        </div>
      </div>
    </>
  );
}
