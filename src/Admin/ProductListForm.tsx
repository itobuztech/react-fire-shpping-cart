import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuids4 } from 'uuid';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from 'lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { ProductListItem } from 'Interface/product-list-item.interface';
import TextInputField from 'Components/TextInputField';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { useParams } from 'react-router-dom';

export default function ProductListForm() {
  const id = uuids4();
  const params = useParams();
  const [image, setImage] = useState<string>('');
  const ProductListCreateSchema = yup.object().shape({
    ProductName: yup.string().trim().required('Product Name is required.'),
    Description: yup.string().trim().required('Description is required'),
    Quantity: yup.string().required('Quantity is required'),
    Price: yup.string().required('Price is required.'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductListItem>({
    resolver: yupResolver(ProductListCreateSchema),
  });

  const imageUpload = async (value: any) => {
    const productId = params.productId;
    const file = value.target.files[0];
    const storagePath = 'ProductsImages/' + file?.name;
    const storageRef = ref(storage, storagePath);
    const upload = await uploadBytes(storageRef, file);
    getDownloadURL((await upload).ref).then(async (imageUrl) => {
      if (productId) {
        updateDoc(doc(db, 'products', String(productId)), {
          Image: imageUrl
        });
      }
      setImage(imageUrl);
    });
  };

  const onSubmit = async (value: ProductListItem) => {
    const productId = params.productId;
    if (productId) {
      const product = doc(db, 'products', productId);
      await updateDoc(product, {
        productId: productId,
        ProductName: value.ProductName,
        Description: value.Description,
        Image: image,
        Category: value.Category,
        Quantity: value.Quantity,
        Price: value.Price,
      });
      toast.success('Product update successful');
    } else {
      const database = collection(db, 'products');
      await setDoc(doc(database, id), {
        productId: id,
        ProductName: value.ProductName,
        Description: value.Description,
        Image: image,
        Category: value.Category,
        Quantity: value.Quantity,
        Price: value.Price,
      });
      toast.success('Product added successful');
    }
  };

  useEffect(() => {
    const productId = params.productId;
    if (productId) {
      const setData = async () => {
        const productRef = doc(db, 'products', productId);
        const getData = await getDoc(productRef);
        const val = getData.data() as ProductListItem;
        setValue('ProductName', val.ProductName);
        setValue('Description', val.Description);
        setImage(val.Image);
        setValue('Category', val.Category);
        setValue('Quantity', val.Quantity);
        setValue('Price', val.Price);
      };
      setData();
    }
  }, [params.productId, setValue]);

  return (
    <>
      <ShoppingCartHeader />
      <ToastContainer />
      <div className='min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-2'>
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>
              {params.productId ? 'Update Product List' : 'Create Product List'}
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              {/* title  */}
              <div className='pb-2'>
                <TextInputField type='text' placeholder='Title' register={register('ProductName')} />
              </div>
              <FormErrorMessage>{errors.ProductName?.message}</FormErrorMessage>
              {/* title End  */}

              {/* description  */}
              <div className='pb-2'>
                <textarea
                  placeholder='Description'
                  {...register('Description')}
                  className='appearance-none rounded-none relative block w-full 
      px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
      rounded-b-md rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 
      focus:z-10 sm:text-sm'
                />
              </div>
              <FormErrorMessage>{errors.Description?.message}</FormErrorMessage>
              {/* description End */}

              {/* image */}
              <div
                className='pb-2 appearance-none rounded-none relative block w-full 
      px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
      rounded-b-md rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 
      focus:z-10 sm:text-sm'>
                <input type='file' placeholder='Upload image' {...register('Image')} onChange={imageUpload} />
              </div>
              <FormErrorMessage>{errors.Image?.message}</FormErrorMessage>
              {/* image End  */}

              {/* Category  */}
              <div>
                <label className='block font-bold mb-2 mt-2'>Categories</label>
                <div>
                  <select
                    {...register('Category')}
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
                <TextInputField type='number' placeholder='Stock quantity' register={register('Quantity')} />
              </div>
              <FormErrorMessage>{errors.Quantity?.message}</FormErrorMessage>
              {/* Quantity End  */}

              {/* Price */}
              <div className='pb-2'>
                <TextInputField type='number' placeholder='Actual Price' register={register('Price')} />
              </div>
              <FormErrorMessage>{errors.Price?.message}</FormErrorMessage>
              {/* Price End  */}
            </div>

            <div className='flex justify-center'>
              <Button>{params.productId ? 'Update' : 'Add'}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
