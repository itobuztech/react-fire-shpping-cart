import React, { useEffect, useState } from 'react';
import { db } from 'lib/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import StarRating from 'Components/StarRating';
import Button from 'Components/Button';
import 'Styles/product-list-header.css';
import Pagination from 'Components/Pagination';
import { ProductListItem } from 'Interface/product-list-item.interface';

export default function ProductList() {
  const [productList, setProductList] = useState<ProductListItem[]>([]);

  const fetchProduct = async () => {
    const getData = await getDocs(collection(db, 'products'));
    const data = getData.docs.map((items) => items.data() as ProductListItem);
    setProductList(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <ShoppingCartHeader />
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='font-bold md:text-4xl sm:text-xl mt-10'>Products</div>
        </div>
        <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4'>
          {productList.map((el: any) => {
            return (
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.productId}>
                <Link to={routes.productDetailsScreen}>
                  {' '}
                  <img className='w-full h-56' src={el.Image} alt='image' />
                  <div className='px-6 py-2'>
                    <div className='font-bold text-xl mb-2'>{el.ProductName}</div>
                    <p className='text-gray-700 text-base'>{el.Description}....</p>
                  </div>
                </Link>

                <div className='px-4 pt-4 pb-2 flex text-sm font-semibold text-gray-700'>
                  <span className='px-3 py-1 mr-2 mb-2 flex'>
                    Price : <BiRupee className='mt-1' /> {el.Price}
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
                  <Link to={routes.checkoutScreen}>
                    <Button>Buy Now</Button>
                  </Link>
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
