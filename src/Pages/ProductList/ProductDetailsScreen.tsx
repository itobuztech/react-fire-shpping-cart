import React, { useEffect, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { MdLocalOffer } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { v4 as uuids4 } from 'uuid';
import { useSelector } from 'react-redux';

import Button from '../../Components/Button';
import { routes } from 'routes';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import StarRating from 'Components/StarRating';
import { ProductListItem } from 'Interface/product-list-item.interface';
import { db } from 'lib/firebase';
import { RootState } from 'Store/store';

export default function ProductDetailsScreen() {
  const params = useParams();
  const [value, setValue] = useState<ProductListItem | any>();
  const [productList, setProductList] = useState<ProductListItem[]>([]);
  const id = uuids4();
  const navigate = useNavigate();

  const cartQuantity = useSelector((state: RootState) => state.cart);

  //current user
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const fetchProduct = async () => {
    const getData = await getDocs(collection(db, 'products'));
    const data = getData.docs.map((items) => items.data() as ProductListItem);
    setProductList(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    (async () => {
      const productId = params.productId;
      if (productId) {
        const productRef = doc(db, 'products', productId);
        const productData = await getDoc(productRef);
        const products = productData.data() as ProductListItem;
        setValue(products);
      }
    })();
  }, [params.productId, setValue]);

  const AddToCart = async (item: ProductListItem) => {
    const cartDatabase = await collection(db, 'cartItem');
    await setDoc(doc(cartDatabase, id), {
      id: id,
      productId: item.productId,
      Quantity: cartQuantity.Quantity + 1,
      userId: currentUser?.uid,
    });
    navigate(routes.cartItem);
  };

  const buyNow = async (item: ProductListItem | any) => {
    const cartDatabase = await collection(db, 'cartItem');
    await setDoc(doc(cartDatabase, id), {
      id: id,
      productId: item.productId,
      Quantity: cartQuantity.Quantity + 1,
      userId: currentUser?.uid,
    });
    navigate(routes.checkoutScreen);
  };

  return (
    <>
      <ShoppingCartHeader />
      <div className='bg-gray-100 p-6'>
        <div className='font-bold md:text-4xl sm:text-xl mb-6 flex justify-center '>Products Details</div>

        {/* product details */}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6'>
          <div className='bg-white'>
            <div className='card-content p-6'>
              <div className=' block relative md:w-96 sm:w-48 h-96 mx-auto'>
                <img src={value?.Image} />
              </div>
              <div className='flex justify-around mt-4'>
                <Button onClick={() => AddToCart(value)}>ADD TO CART</Button>

                <Button onClick={() => buyNow(value)}>BUY NOW</Button>
              </div>
            </div>
          </div>

          <div className='card bg-white'>
            <div className='card-content p-6'>
              <div className='field p-2'>
                <div className='font-bold md:text-3xl sm:text-xl mb-2'>{value?.ProductName}</div>
                <div className='mt-2'>
                  <StarRating rating={value?.rating} />
                </div>
                <div>
                  {' '}
                  <span className='mb-3 flex font-semibold'>
                    Price : <BiRupee className='mt-1' /> {value?.Price}
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
                <div className='text-gray-700 text-base mt-4'>{value?.Description}</div>
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
            {productList.map((el) => {
              return (
                <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.productId}>
                  <img className='w-full h-60' src={el.Image} alt='image' />
                  <div className='px-6 py-2'>
                    <div className='font-bold text-xl mb-2'>{el.ProductName}</div>
                  </div>

                  <div className='px-4 pb-4 text-sm font-semibold text-gray-700'>
                    <span className='px-3 py-1 mr-2 mb-2 flex'>
                      Price : <BiRupee className='mt-1' /> {el.Price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* relate products end */}
      </div>
    </>
  );
}
