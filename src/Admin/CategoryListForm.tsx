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

import TextInputField from 'Components/TextInputField';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { useParams } from 'react-router-dom';
import { CategoryData } from 'Interface/category-data.interface';

export default function CategoryListForm() {
  const id = uuids4();
  const params = useParams();
  const [image, setImage] = useState<string>('');
  const CategoryListCreateSchema = yup.object().shape({
    CategoryName: yup.string().trim().required('Product Name is required.'),
    Description: yup.string().trim().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryData>({
    resolver: yupResolver(CategoryListCreateSchema),
  });

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const imageUpload = async (value: any) => {
    const categoryId = params.categoryId;
    const file = value.target.files[0];
    const storagePath = 'CategoryImages/' + file?.name;
    const storageRef = ref(storage, storagePath);
    const upload = await uploadBytes(storageRef, file);
    getDownloadURL((await upload).ref).then(async (imageUrl) => {
      if (categoryId) {
        updateDoc(doc(db, 'products', String(categoryId)), {
          Image: imageUrl,
        });
      }
      setImage(imageUrl);
    });
  };

  const onSubmit = async (value: CategoryData) => {
    const categoryId = params.categoryId;
    if (categoryId) {
      const category = doc(db, 'categories', categoryId);
      await updateDoc(category, {
        categoryId: categoryId,
        CategoryName: value.CategoryName,
        Description: value.Description,
        Image: image,
      });
      toast.success('Category update successful');
    } else {
      const database = collection(db, 'categories');
      await setDoc(doc(database, id), {
        categoryId: id,
        CategoryName: value.CategoryName,
        Description: value.Description,
        Image: image,
        create_date: date
      });
      toast.success('Category added successful');
      reset();
    }
  };

  useEffect(() => {
    const categoryId = params.categoryId;
    if (categoryId) {
      const setData = async () => {
        const categoryRef = doc(db, 'categories', categoryId);
        const getData = await getDoc(categoryRef);
        const val = getData.data() as CategoryData;
        setValue('CategoryName', val.CategoryName);
        setValue('Description', val.Description);
        setImage(val.Image);
      };
      setData();
    }
  }, [params.categoryId, setValue]);

  return (
    <>
      <ShoppingCartHeader />
      <ToastContainer />
      <div className='min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-2'>
          <div>
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>
              {params.categoryId ? 'Update Category List' : 'Create Category List'}
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='rounded-md -space-y-px'>
              {/* title  */}
              <div className='pb-2'>
                <TextInputField type='text' placeholder='Title' register={register('CategoryName')} />
              </div>
              <FormErrorMessage>{errors.CategoryName?.message}</FormErrorMessage>
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
            </div>

            <div className='flex justify-center'>
              <Button>{params.categoryId ? 'Update' : 'Add'}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
