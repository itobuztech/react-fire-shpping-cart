import React, { useEffect, useState } from 'react';
import { db } from 'lib/firebase';
import { getDocs, collection } from 'firebase/firestore';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import Pagination from 'Components/Pagination';
import { CategoryData } from 'Interface/category-data.interface';

export default function ProductCategoryList() {
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);

  const fetchCategory = async () => {
    const getData = await getDocs(collection(db, 'categories'));
    const data = getData.docs.map((items) => items.data() as CategoryData);
    setCategoryList(data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <ShoppingCartHeader />
      <div className='container mx-auto'>
        <div className='font-bold md:text-4xl sm:text-xl mt-10 flex justify-center'>Categories</div>

        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {categoryList.map((el) => {
            return (
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.categoryId}>
                <img className='w-full' src={el.Image} alt='image' />
                <div className='px-6 py-2'>
                  <div className='font-bold text-xl mb-2'>{el.CategoryName}</div>
                  <p className='text-gray-700 text-base'>{el.Description}....</p>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination />
      </div>
    </>
  );
}
