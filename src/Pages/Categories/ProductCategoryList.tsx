import React from 'react';
import faker from '@faker-js/faker';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import Pagination from 'Components/Pagination';
import Button from 'Components/Button';

export default function ProductCategoryList() {
  const categories = [...Array(15)].map(() => ({
    id: faker.datatype.uuid(),
    productName: faker.commerce.productName(),
    image: faker.image.business(600, 400),
    description: faker.lorem.words(4),
  }));

  return (
    <>
      <ShoppingCartHeader />
      <div className='container mx-auto'>
        <div className='flex justify-center relative'>
        <div className='font-bold md:text-4xl sm:text-xl mt-10'>Categories</div>

        {/* Only visible for admin */}
        <div className='absolute right-6 mt-10'>
          <Button>Add new</Button>
        </div>
        </div>
        {/* Only visible for admin end */}
        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {categories.map((el) => {
            return (
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.id}>
                <img className='w-full' src={el.image} alt='image' />
                <div className='px-6 py-2'>
                  <div className='font-bold text-xl mb-2'>{el.productName}</div>
                  <p className='text-gray-700 text-base'>{el.description}....</p>
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
