import Button from 'Components/Button';
import FormErrorMessage from 'Components/FormErrorMessage';
import ProductListHeader from 'Components/ProductListHeader';
import { collection, getDocs, query } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface CategoryOption {
  value: string;
  label: string;
}

export default function PostAction() {
  const [categoryList, setCategoryList] = useState<CategoryActionInterface>();
  const [optionList, setOptionList] = useState<string[]>([]);

  const fetchCategory = async () => {
    const q = query(collection( db, 'category' ));
    const queryData = await getDocs(q);
    const data = queryData.docs.map(i => i.data() as CategoryActionInterface);
    const dataItem = data.map(i => i.categoryName);
    setOptionList(dataItem);
  };

  const categoryOption = [
    { value: optionList, label: optionList }
  ];

  // const loadOptions = (
  //   inputValue: string,
  //   callback: (options: CategoryActionInterface[]) => void
  // ) => {
  //   console.log('load option');
  //   (async () => {
  //     callback(await fetchCategory(inputValue));
  //   })();
  // };

  // const handleInputChange = async (newValue: string) => {
  //   await fetchCategory();
  //   return newValue.replace(/\W/g, '');
  // };

  useEffect(() => {
    (async () => {
      fetchCategory();
    })();
  }, []);


  return (
    <>
    <ProductListHeader />
    <div className="container mx-auto">
      <h1 className="font-semibold text-xl mb-3">Add new product item</h1>
      <form className="flex flex-col space-y-2 max-w-sm">
        <div className="flex flex-col space-y-1">
          <label htmlFor="product-name">Name</label>
          <input type="text" placeholder="Enter a product name" className="form-input" />
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="product-desc">Description</label>
          <textarea placeholder="Enter product description" className="form-textarea"
           />
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="featured-img">Featured image</label>
          <input type="file" />
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="category-opt">Category options</label>
          <Select options={categoryOption} />
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="product-quantity">Quantity</label>
          <input type="number" className="form-input mr-1 flex-1" />
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="purchase-price">Purchase Price</label>
          <div className="flex items-center">
           <span className="text-xs">INR</span> <input type="number" className="form-input ml-1 flex-1" /> 
          </div>
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="sales-price">Sales Price</label>
          <div className="flex items-center">
            <span className="text-xs">INR</span> <input type="number" className="form-input ml-1 flex-1" /> 
          </div>
          <FormErrorMessage>{}</FormErrorMessage>
        </div>
        <Button>Add</Button>
      </form>
    </div>
    </>
  );
}
