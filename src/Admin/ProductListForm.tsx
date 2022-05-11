import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuids4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from 'lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { ProductListItem } from 'Interface/product-list-item.interface';
import TextInputField from 'Components/TextInputField';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';

export default function ProductListForm() {
  const id = uuids4();
  const [image, setImage] = useState<string>('');
  const ProductListCreateSchema = yup.object().shape({
    title: yup.string().trim().required('Product Name is required.'),
    description: yup.string().trim().required('Description is required'),
    quantity: yup.string().required('Quantity is required'),
    price: yup.string().required('Price is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductListItem>({
    resolver: yupResolver(ProductListCreateSchema),
  });

  const imageUpload = async (value: any) => {
    const file = value.target.files[0];
    const storagePath = 'ProductsImages/' + file?.name;
    const storageRef = ref(storage, storagePath);
    const upload = await uploadBytes(storageRef, file);
    getDownloadURL((await upload).ref).then(async (imageUrl) => {
      setImage(imageUrl);
    });
  };

  const onSubmit = async (value: ProductListItem) => {
    const database = collection(db, 'products');
    try {
      await addDoc(database, {
        productId: id,
        ProductName: value.title,
        Description: value.description,
        Image: image,
        Category: value.category,
        Quantity: value.quantity,
        Price: value.price,
      });
      toast.success('Product added successful');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <ShoppingCartHeader />
      <ToastContainer />
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
                <textarea
                  placeholder='Description'
                  {...register('description')}
                  className='appearance-none rounded-none relative block w-full 
      px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
      rounded-b-md rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 
      focus:z-10 sm:text-sm'
                />
              </div>
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              {/* description End */}

              {/* image */}
              <div
                className='pb-2 appearance-none rounded-none relative block w-full 
      px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
      rounded-b-md rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 
      focus:z-10 sm:text-sm'>
                <input type='file' placeholder='Upload image' {...register('image')} onChange={imageUpload} />
              </div>
              <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              {/* image End  */}

              {/* Category  */}
              <div>
                <label className='block font-bold mb-2 mt-2'>Categories</label>
                <div>
                  <select
                    {...register('category')}
                    className='appearance-none rounded-none relative block w-full 
      px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
      rounded-b-md rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 
      focus:z-10 sm:text-sm'>
                    <option value='Electronics'>Electronics</option>
                    <option value='Mobiles'>Mobiles</option>
                    <option value='Fashion'>Fashion</option>
                    <option value='Jewelry'>Jewelry</option>
                    <option value='Cosmetics'>Cosmetics</option>
                  </select>
                </div>
              </div>
              {/* Category End  */}
              {/* Quantity */}
              <div className='pt-3 pb-2'>
                <TextInputField type='number' placeholder='Stock quantity' register={register('quantity')} />
              </div>
              <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
              {/* Quantity End  */}

              {/* Price */}
              <div className='pb-2'>
                <TextInputField type='number' placeholder='Actual Price' register={register('price')} />
              </div>
              <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              {/* Price End  */}
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
