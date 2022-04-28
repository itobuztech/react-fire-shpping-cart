import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import { addDoc, collection } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function CategoryAction() {
  const categoryActionSchema = yup.object().shape({
    categoryName: yup.string().required('Please enter a category name'),
    categoryDesc: yup.string().required('Please enter short description for category'),
    categoryImage: yup.mixed()
    .test('required', 'Please provide an image', (value) =>{
      return value && value.length;
    } )
  });
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryActionInterface>({
    resolver: yupResolver(categoryActionSchema)
  });
  const onSubmit = async (data: CategoryActionInterface) => {
    await addDoc(collection(db, 'category'), {
      id: String(new Date().getTime()),
      categoryName: data.categoryName,
      categoryDesc: data.categoryDesc
    }
    );
  };
  
  return (
    <div className="container mx-auto p-2">
      <h1 className="font-semibold text-xl mb-3">Add new category item</h1>
      <form className="flex flex-col space-y-2 max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-name">Name</label>
          <input type="text" placeholder="Enter a category name" className="form-input" {...register('categoryName')} />
          <FormErrorMessage>{errors.categoryName?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-name">Description</label>
          <textarea placeholder="Enter a category description" className="form-textarea"
          {...register('categoryDesc')} />
          <FormErrorMessage>{errors.categoryDesc?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-name">Featured image</label>
          <input type="file" {...register('categoryImage')} />
          <FormErrorMessage>{errors.categoryImage?.message}</FormErrorMessage>
        </div>
        <Button>Add</Button>
      </form>
    </div>
  );
}
