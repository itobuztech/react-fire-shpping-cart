import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

export default function CategoryAction() {
  const { id } = useParams();
  const categoryActionSchema = yup.object().shape({
    categoryName: yup.string().required('Please enter a category name'),
    categoryDesc: yup.string().required('Please enter short description for category'),
    // categoryImage: yup.mixed()
    // .test('required', 'Please provide an image', (value) =>{
    //   return value && value.length;
    // } )
  });
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CategoryActionInterface>({
    resolver: yupResolver(categoryActionSchema)
  });
  const onSubmit = async (data: CategoryActionInterface) => {
    // update category
    if (id) {
      const categoryDocRef = doc(db, 'category', id as unknown as string);
      await updateDoc(categoryDocRef, {
        categoryName: data.categoryName,
        categoryDesc: data.categoryDesc
      });
    } else {
    // add category
      const generateId = uuidv4();
      await setDoc(doc(db, 'category', generateId), {
        id: generateId,
        categoryName: data.categoryName,
        categoryDesc: data.categoryDesc
      }
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const docRef = doc(db, 'category', String(id));
        const docSnap = await getDoc(docRef);
        const data = docSnap.data() as CategoryActionInterface;
        setValue('categoryName', data.categoryName);
        setValue('categoryDesc', data.categoryDesc);
      }
  })();
  }, [id, setValue]);

  return (
    <div className="container mx-auto p-2">
      <h1 className="font-semibold text-xl mb-3">{id ? 'Update' : 'Add new'} category item</h1>
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
        <Button>{id ? 'Update' : 'Add'}</Button>
      </form>
    </div>
  );
}
