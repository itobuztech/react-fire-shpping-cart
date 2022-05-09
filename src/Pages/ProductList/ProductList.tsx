import React from 'react';
import faker from '@faker-js/faker';

import ProductListHeader from 'Components/ProductListHeader';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';
import StarRating from 'Components/StarRating';
import Button from 'Components/Button';
import 'Styles/product-list-header.css';
import Pagination from 'Components/Pagination';

export default function ProductList() {
  const products = [...Array(12)].map(() => ({
    id: faker.datatype.uuid(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.business(600, 400),
    description: faker.lorem.words(4),
    rating: faker.datatype.number({ min: 0, max: 5 }),
  }));

  return (
    <>
      <ProductListHeader />
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='font-bold md:text-4xl sm:text-xl mt-10'>Products</div>
        </div>
        <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4'>
          {products.map((el) => {
            return (
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.id}>
                <Link to={routes.productDetailsScreen}>
                  {' '}
                  <img className='w-full' src={el.image} alt='image' />
                  <div className='px-6 py-2'>
                    <div className='font-bold text-xl mb-2'>{el.productName}</div>
                    <p className='text-gray-700 text-base'>{el.description}....</p>
                  </div>
                </Link>

                <div className='px-4 pt-4 pb-2 flex text-sm font-semibold text-gray-700'>
                  <span className='px-3 py-1 mr-2 mb-2 flex'>
                    Price : <BiRupee className='mt-1' /> {el.price}
                  </span>
                  <div className='flex'>
                    <span className='px-3 py-1 mb-2'>Ratings:</span>
                    <div className='mt-2'>
                      <StarRating rating={el.rating} />
                    </div>
                  </div>
                </div>
                <div className='pb-10 flex justify-around'>
                  <Button>
                    <Link to={routes.productCart}>ADD TO CART</Link>
                  </Button>
                  <Button>Buy Now</Button>
                </div>
              </div>
            );
          })}
        </div>
       <Pagination/>
      </div>
    </>
  );
}
