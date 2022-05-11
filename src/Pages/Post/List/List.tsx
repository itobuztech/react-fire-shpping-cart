import Button from 'Components/Button';
import Pagination from 'Components/Pagination';
import ProductListHeader from 'Components/ProductListHeader';
import StarRating from 'Components/StarRating';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { ProductListItem } from 'Interface/product-list-item.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

export default function MyProductList() {
  const [productList, setProductList] = useState<ProductListItem[]>([]);

  const fetchData = async () => {
    const q = query(collection( db, 'myProducts' ));
    const queryData = await getDocs(q);
    const data = queryData.docs.map(i => i.data() as ProductListItem);
    setProductList(data);
  };

  // for delete category
  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, 'myProducts', String(id)));
    setProductList(productList.filter(d => d.id !== id));
  };
  
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <ProductListHeader />
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='font-bold md:text-4xl sm:text-xl mt-10'>Products</div>
        </div>
        <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4'>
          {productList.map((el) => {
            return (
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.id}>
                <Link to={routes.productDetailsScreen}>
                  {' '}
                  <img className='w-full' src={el.productImage} alt='image' />
                  <div className='p-2'>
                    <div className='font-bold text-xl mb-2'>{el.title}</div>
                    <p className='text-gray-700 text-base'>{el.description}....</p>
                  </div>
                </Link>

                <div className='px-2 pt-4 pb-2 grid grid-cols-2 text-sm font-semibold text-gray-700'>
                  <span className='py-1 mr-2 mb-2 flex'>
                    Price :
                    <div className="flex flex-col flex-1">
                      <del className='flex'><BiRupee className='mt-1' /> ({el.actualPrice})</del> 
                      <small className='flex'><BiRupee className='mt-1' /> {el.discountedPrice}</small>
                    </div>
                  </span>
                  <div className='flex'>
                    <span className='px-3 py-1 mb-2'>Ratings:</span>
                    <div className='mt-2'>
                      <StarRating />
                    </div>
                  </div>
                </div>
                <div className='pb-10 flex justify-around'>
                  <Button>
                    <Link to={routes.myProductEdit.build(String(el.id))}>Edit</Link>
                  </Button>
                  <Button onClick={() => onDelete(String(el.id))}>Delete</Button>
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
