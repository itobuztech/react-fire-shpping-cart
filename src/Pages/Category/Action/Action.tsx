import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable }
 from 'firebase/storage';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import ListHeader from 'Components/ListHeader';
import { getAuth } from 'firebase/auth';
import { TiDelete } from 'react-icons/ti';

export default function CategoryAction() {
  const { id } = useParams();
  const [image, setImage] = useState<any>(null);
  const auth = getAuth();
  const storage = getStorage();
  const categoryActionSchema = yup.object().shape({
    categoryName: yup.string().required('Please enter a category name'),
    categoryDesc: yup.string().required('Please enter short description for category'),
  });
  const { register, handleSubmit, setValue, reset, 
    formState: { errors, isSubmitting } } = useForm<CategoryActionInterface>({
    resolver: yupResolver(categoryActionSchema)
  });

  const fileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    const storagePath = 'uploads/' + file?.name;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    getDownloadURL((await uploadTask).ref).then(async (downloadURL) => {
      updateDoc(doc(db, 'category', String(id)), {
        categoryImage: downloadURL
      });
      setImage(downloadURL);
    });
  };

  const onSubmit = async (data: CategoryActionInterface) => {
    // update category
    if (id) {
      const categoryDocRef = doc(db, 'category', id as unknown as string);
      await updateDoc(categoryDocRef, {
        id: id,
        categoryName: data.categoryName,
        categoryDesc: data.categoryDesc,
        categoryImage: image,
        uid: auth.currentUser?.uid
      });
    } else {
    // add category
      const generateId = uuidv4();
      await setDoc(doc(db, 'category', generateId), {
        id: generateId,
        categoryName: data.categoryName,
        categoryDesc: data.categoryDesc,
        categoryImage: image,
        uid: auth.currentUser?.uid
      });
    reset();
    }
  };

  function deleteImage() {
    updateDoc(doc(db, 'category', String(id)), {
      categoryImage: null
    });
    setImage(null);
  }

  useEffect(() => {
    (async () => {
      if (id) {
        const docRef = doc(db, 'category', String(id));
        const docSnap = await getDoc(docRef);
        const data = docSnap.data() as CategoryActionInterface;
        setValue('categoryName', data.categoryName);
        setValue('categoryDesc', data.categoryDesc);
        setValue('categoryImage', data.categoryImage);
        setImage(data.categoryImage);
      }
  })();
  }, [id, setValue, image]);

  return (
    <>
    <ListHeader />
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
          {
            image && (
            <div className="flex relative">
              <img src={image} width={50} height={50} />
              <button onClick={() => deleteImage()} className="absolute top-0 right-0"><TiDelete /></button>
            </div>
          )}
          <input type="file" {...register('categoryImage')} onChange={fileChange} />
          <FormErrorMessage>{errors.categoryImage?.message}</FormErrorMessage>
        </div>
        <Button disabled={isSubmitting} loading={isSubmitting}>{id ? 'Update' : 'Add'}</Button>
      </form>
    </div>
    </>
  );
}
