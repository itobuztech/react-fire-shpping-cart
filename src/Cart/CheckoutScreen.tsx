import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import TextInputField from 'Components/TextInputField';
import { UserDetails } from 'Interface/user-details.interface';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import FormHeader from 'Components/FormHeader';
import { BiRupee } from 'react-icons/bi';

export default function CheckoutScreen() {
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
    formState: { errors },
  } = useForm<UserDetails>({
    resolver: yupResolver(UserDetailsSchema),
  });
  const onSubmit = async () => {};
  return (
    <>
      <FormHeader />
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
            <Button>Continue</Button>
          </form>
          <Button>
            <Link to={routes.cartItem}>Back to Cart</Link>
          </Button>
        </div>
        {/*Order summary section */}
        <div className='w-1/4 px-8'>
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
                <span className='font-semibold text-sm'>480</span>
              </div>
            </div>
          </div>
          {/*Order summary section end */}
        </div>
      </div>
    </>
  );
}
