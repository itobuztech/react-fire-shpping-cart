import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProductListItem } from 'Interface/product-list-item.interface';
import TextInputField from 'Components/TextInputField';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import AuthHeader from 'Components/FormHeader';
import Select from 'react-select';

export default function ProductListForm() {
  const ProductListCreateSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required.'),
    description: yup.string().trim().required('Description is required'),
    image: yup.string(),
    category: yup.string(),
    quantity: yup.string().required('Quantity is required').trim(),
    actualPrice: yup.string().trim().required('Price is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductListItem>({
    resolver: yupResolver(ProductListCreateSchema),
  });

  const options = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Mobiles', label: 'Mobiles' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Jewelry', label: 'Jewelry' },
  ];
  const onSubmit = async () => {};

  return (
    <>
      <AuthHeader />
      <div className='min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-2'>
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Create Product List</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              {/* title  */}
              <div className='pb-2'>
                <TextInputField type='text' placeholder='Title' register={register('title')} />
              </div>
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              {/* title End  */}

              {/* description  */}
              <div className='pb-2'>
                <TextInputField type='text' placeholder='Description' register={register('description')} />
              </div>
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              {/* description End */}

              {/* image */}
              <div className='pb-2'>
                <TextInputField type='file' placeholder='Upload image' register={register('image')} />
              </div>
              <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              {/* image End  */}

              {/* Category  */}
              <div>
                <label className='block font-bold mb-2'>Categories</label>
                <div>
                  <Select options={options} />
                </div>
              </div>
              {/* Category End  */}
              {/* Quantity */}
              <div className='pt-3 pb-2'>
                <TextInputField type='number' placeholder='Stock quantity' register={register('quantity')} />
              </div>
              <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
              {/* Quantity End  */}

              {/* Actual price */}
              <div className='pb-2'>
                <TextInputField type='number' placeholder='Actual Price' register={register('actualPrice')} />
              </div>
              <FormErrorMessage>{errors.actualPrice?.message}</FormErrorMessage>
              {/* Actual price End  */}

              {/* Discounted price */}
              <div>
                <TextInputField type='number' placeholder='Discounted Price' register={register('discountedPrice')} />
              </div>
              {/* Discounted price End  */}
            </div>

            <div className='flex justify-center'>
              <Button>Add</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
