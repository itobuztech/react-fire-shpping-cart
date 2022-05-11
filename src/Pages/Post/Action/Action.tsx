import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import ProductListHeader from 'Components/ProductListHeader';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { ProductListItem } from 'Interface/product-list-item.interface';
import { db, storage } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useParams } from 'react-router-dom';
interface CategoryOption {
  value: string;
  label: string;
}

export default function PostAction() {
  const { id } = useParams();
  const [optionList, setOptionList] = useState<CategoryOption[]>([]);
  const [optionValue, setOptionValue] = useState<CategoryOption>();
  const [image, setImage] = useState<any>(null);

  const productActionSchema = yup.object().shape({
    title: yup.string().required('Please enter a product name'),
    description: yup.string().required('Please enter short description for product'),
    category: yup.string().required('Please select a category'),
    quantity: yup.number().required('Please set at least 1 quantity'),
    actualPrice: yup.number().required('Please set a price'),
    discountedPrice: yup.number().required('Please set a discounted price')
  });
  const { register, handleSubmit, setValue, reset, trigger,
    formState: { errors, isSubmitting } } = useForm<ProductListItem>({
    resolver: yupResolver(productActionSchema)
  });

  const fileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    const storagePath = 'uploads/' + file?.name;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    getDownloadURL((await uploadTask).ref).then(async (downloadURL) => {
      if (id) {
        updateDoc(doc(db, 'myProducts', String(id)), {
          productImage: downloadURL
        });
      }
      setImage(downloadURL);
    });
  };

  const onSubmit = async (data: ProductListItem) => {
    if (id) {
      const categoryDocRef = doc(db, 'myProducts', id as unknown as string);
      await updateDoc(categoryDocRef, {
        id: id,
        title: data.title,
        description: data.description,
        category: data.category,
        quantity: data.quantity,
        actualPrice: data.actualPrice,
        discountedPrice: data.discountedPrice,
        productImage: image
      });
    } else {
      const generateId = uuidv4();
      await setDoc(doc(db, 'myProducts', generateId), {
        id: generateId,
        title: data.title,
        description: data.description,
        category: data.category,
        quantity: data.quantity,
        actualPrice: data.actualPrice,
        discountedPrice: data.discountedPrice,
        productImage: image
      });
      reset();
      setImage(null);
    }
  };

  useEffect(() => {
    async function fetchCategoryList() {
      const categoryOption: CategoryOption[] = [];
      const q = query(collection( db, 'category' ));
      const queryData = await getDocs(q);
      const data = queryData.docs.map(i => i.data() as CategoryActionInterface);
      data.forEach(i => categoryOption.push({
        label: i.categoryName,
        value: i.categoryName
      }));
      setOptionList(categoryOption);
    }
    async function setDataForm() {
      const docRef = doc(db, 'myProducts', String(id));
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as ProductListItem;
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('category', data.category);
      setValue('quantity', data.quantity);
      setValue('actualPrice', data.actualPrice);
      setValue('discountedPrice', data.discountedPrice);
      setValue('productImage', data.productImage);
      setImage(data.productImage);
      setOptionValue({ value: data.category, label: data.category });
    }
    fetchCategoryList();
    if (id) 
      setDataForm();
  }, [id, setValue]);


  return (
    <>
    <ProductListHeader />
    <div className="container mx-auto">
      <h1 className="font-semibold text-xl mb-3">Add new product item</h1>
      <form className="flex flex-col space-y-2 max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="product-name">Name</label>
          <input type="text" placeholder="Enter a product name"
          className="form-input" {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="product-desc">Description</label>
          <textarea placeholder="Enter product description" className="form-textarea"
           {...register('description')} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="featured-img">Featured image</label>
          <input type="file" {...register('productImage')} onChange={fileChange} />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-opt">Category options</label>
          <Select options={optionList} 
          id="category"
          name="category"
          onChange={(value) => {
            if (value) {
              setOptionValue(value);
              setValue('category', value?.value);
              console.log(value.value);
              trigger('category');
            }
          }}
          value={optionValue} />
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="product-quantity">Quantity</label>
          <input type="number" className="form-input mr-1 flex-1"
           {...register('quantity')} />
          <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="purchase-price">Purchase Price</label>
          <div className="flex items-center">
           <span className="text-xs">INR</span> 
           <input type="number" className="form-input ml-1 flex-1" {...register('actualPrice')} /> 
          </div>
          <FormErrorMessage>{errors.actualPrice?.message}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="sales-price">Sales Price</label>
          <div className="flex items-center">
            <span className="text-xs">INR</span>
            <input type="number" className="form-input ml-1 flex-1" {...register('discountedPrice')} /> 
          </div>
          <FormErrorMessage>{errors.discountedPrice?.message}</FormErrorMessage>
        </div>
        <Button disabled={isSubmitting} loading={isSubmitting}>Add</Button>
      </form>
    </div>
    </>
  );
}
