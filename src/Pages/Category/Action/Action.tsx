import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import { CategoryActionIf } from 'Interface/categoryaction.interface';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function CategoryAction() {
  const categoryActionSchema = yup.object().shape({
    catName: yup.string().required('Please enter a category name'),
    catDesc: yup.string().required('Please enter short description for category'),
    catImage: yup.mixed()
    .test('required', 'Please provide an image', (value) =>{
      return value && value.length;
    } )
  });
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryActionIf>({
    resolver: yupResolver(categoryActionSchema)
  });
  const onSubmit = (data: CategoryActionIf) => {
    console.log(data);
  };
  
  return (
    <div className="container mx-auto p-2">
      <h1 className="font-semibold text-xl mb-3">Add new category item</h1>
      <form className="flex flex-col space-y-2 max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-name">Name</label>
          <input type="text" placeholder="Enter a category name" className="form-input" {...register('catName')} />
          <FormErrorMessage>{errors.catName?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-name">Description</label>
          <textarea placeholder="Enter a category description" className="form-textarea" {...register('catDesc')} />
          <FormErrorMessage>{errors.catDesc?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-name">Featured image</label>
          <input type="file" {...register('catImage')} />
          <FormErrorMessage>{errors.catImage?.message}</FormErrorMessage>
        </div>
        <Button>Add</Button>
      </form>
    </div>
  );
}
