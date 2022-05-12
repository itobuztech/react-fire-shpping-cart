import faker from '@faker-js/faker';
import StarRating from 'Components/StarRating';
import React, { useEffect, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { MdLocalOffer } from 'react-icons/md';
import { routes } from 'routes';
import { Link, useParams } from 'react-router-dom';

import Button from '../../Components/Button';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';

export default function ProductDetailsScreen() {
  const params = useParams();
  const [value, setValue] = useState<any>();
  const relateProducts = [...Array(4)].map(() => ({
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.business(600, 400),
  }));
  useEffect(() => {
    (async () => {
      const productId = params.productId;
      if (productId) {
        const docRef = doc(db, 'products', productId);
        const d = await getDoc(docRef);
        const products = d.data() as any;
        setValue(products);
        console.log(products);
      }
    })();
  }, [params.productId]);

  return (
    <>
      <ShoppingCartHeader />
      <body className='bg-gray-100 p-6'>
        <div className='flex justify-center'>
          <div className='font-bold md:text-4xl sm:text-xl mb-6 '>Products Details</div>

          {/* Only visible for admin */}
          <div className='absolute right-6'>
            <Link to={routes.productListForm}>
              <Button>Edit Product</Button>
            </Link>
          </div>
        </div>
        {/* Only visible for admin end */}

        {/* product details */}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6'>
          <div className='bg-white'>
            <div className='card-content p-6'>
              <div className=' block relative md:w-96 sm:w-48 h-96 mx-auto'></div>
              <div className='flex justify-around mt-4'>
                <Link to={routes.cartItem}>
                  <Button>ADD TO CART</Button>
                </Link>
                <Link to={routes.checkoutScreen}>
                  <Button>BUY NOW</Button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className='card bg-white'>
              <div className='card-content p-6'>
                <div className='field p-2'>
                  <div className='font-bold md:text-3xl sm:text-xl mb-2'>{value.ProductName}</div>
                  <div className='mt-2'>
                    <StarRating rating={value.rating} />
                  </div>
                  <div>
                    {' '}
                    <span className='mb-3 flex font-semibold'>
                      Price : <BiRupee className='mt-1' /> {value.Price}
                    </span>
                  </div>
                  <div>
                    <div className='font-semibold text-xl mb-2'>Available offers</div>
                    <div className='flex'>
                      <div className='mt-1 mr-2 text-green-600'>
                        <MdLocalOffer />
                      </div>
                      <div className='mb-4'>
                        <span className='font-semibold'>Bank Offer</span>
                        10% off on SBI Credit Card, up to ₹750. On orders of ₹5000 and above
                        <span className='text-blue-500 ml-2'>T&C</span>
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='mt-1 mr-2 text-green-600'>
                        <MdLocalOffer />
                      </div>
                      <div>
                        <span className='font-semibold'>Bank Offer</span>
                        10% off on SBI Credit Card EMI transactions, up to ₹1000. On orders of ₹5000 and above
                        <span className='text-blue-500 ml-2'>T&C</span>
                      </div>
                    </div>
                  </div>
                  <div className='text-gray-700 text-base mt-4'>{value.Description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* product details end */}

        {/* relate products */}
        <div className='container mx-auto'>
          <div className='flex justify-center'>
            <div className='font-bold md:text-4xl sm:text-xl mt-4'>Related Products</div>
          </div>
          <div className='mt-6 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {relateProducts.map((el) => {
              return (
                <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg'>
                  <img className='w-full' src={el.image} alt='image' />
                  <div className='px-6 py-2'>
                    <div className='font-bold text-xl mb-2'>{el.productName}</div>
                  </div>

                  <div className='px-4 pb-4 text-sm font-semibold text-gray-700'>
                    <span className='px-3 py-1 mr-2 mb-2 flex'>
                      Price : <BiRupee className='mt-1' /> {el.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* relate products end */}
      </body>
    </>
  );
}
