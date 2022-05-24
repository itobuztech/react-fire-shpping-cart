import React, { useEffect, useState } from 'react';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';
import { v4 as uuids4 } from 'uuid';
import { useSelector } from 'react-redux';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import StarRating from 'Components/StarRating';
import Button from 'Components/Button';
import 'Styles/product-list-header.css';
import Pagination from 'Components/Pagination';
import { ProductListItem } from 'Interface/product-list-item.interface';
import { routes } from 'routes';
import { db } from 'lib/firebase';
import { RootState } from 'Store/store';
import { CartItem } from 'Interface/CartItem.interface';

export default function ProductList() {
  const [productList, setProductList] = useState<ProductListItem[]>([]);
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const id = uuids4();
  const cartQuantity = useSelector((state: RootState) => state.cart);

  //current user
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // get product list
  const fetchProduct = async () => {
    const getData = await getDocs(collection(db, 'products'));
    const data = getData.docs.map((items) => items.data() as ProductListItem);
    setProductList(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  // get cart items
  const fetchCart = async () => {
    const getData = await getDocs(collection(db, 'cartItem'));
    const data = getData.docs.map((items) => items.data() as CartItem);
    setCartList(data);
  };
  useEffect(() => {
    fetchCart();
  }, []);

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

  const buyNow = async (item: ProductListItem) => {
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
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='font-bold md:text-4xl sm:text-xl mt-10'>Products</div>
        </div>
        <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4'>
          {productList.map((el) => {
            const inCart = Boolean(cartList.find((item) => item.productId === el.productId));
            return (
              <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.productId}>
                <Link to={routes.productDetailsScreen.build(el.productId)}>
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
                  {!inCart && <Button onClick={() => AddToCart(el)}>ADD TO CART</Button>}

                  {inCart && (
                    <Link to={routes.cartItem}>
                      <Button>GO TO CART</Button>
                    </Link>
                  )}
                  <Button onClick={() => buyNow(el)}>Buy Now</Button>
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
