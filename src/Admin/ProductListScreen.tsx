import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { MdDeleteSweep } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import Button from 'Components/Button';
import Pagination from 'Components/Pagination';
import '../Styles/product-list-admin.css';
import { ProductListItem } from 'Interface/product-list-item.interface';

export default function ProductListScreen() {
  const [productList, setProductList] = useState<ProductListItem[]>([]);

  const fetchProduct = async () => {
    const getData = await getDocs(collection(db, 'products'));
    const data = getData.docs.map((items) => items.data() as ProductListItem);
    setProductList(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const deleteProduct = async (productId: string) => {
    const result = doc(db, 'products', productId);
    try {
      await deleteDoc(result);
      setProductList(productList.filter((items) => items.productId !== productId));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <ShoppingCartHeader />
      <div className='flex justify-center relative'>
        <div className='font-bold md:text-4xl sm:text-xl mt-10'>Products</div>

        {/* Only visible for admin */}
        <div className='absolute right-6 mt-10'>
          <Link to={routes.productListForm}>
            <Button>Add new</Button>
          </Link>
        </div>
        {/* Only visible for admin end */}
      </div>
      <section className='section mt-10'>
        <div className='card'>
          <div className='card-content'>
            <table className='w-full'>
              <thead className='hidden lg:table-header-group'>
                <tr
                  className='max-w-full block relative border-b-4 border-gray-100
    lg:table-row lg:border-b-0'>
                  <th className='checkbox-cell lg:w-5'></th>
                  <th className='image-cell border-b-0 lg:w-6'></th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productList.map((el) => {
                  return (
                    <tr key={el.productId}>
                      <td className='lg:w-5'></td>
                      <td className='image-cell'>
                        <div className='image w-24 h-24 mx-auto lg:w-6 lg:h-6'>
                          <img src={el.Image} className='rounded-full' />
                        </div>
                      </td>
                      <td data-label='Product Name'>{el.ProductName}</td>
                      <td data-label='Product Description'>{el.Description}</td>
                      <td data-label='Product Quantity'>{el.Quantity}</td>
                      <td data-label='Product Price'>{el.Price}</td>
                      <td data-label='Created'>
                        <small className='text-gray-500' title='Oct 25, 2021'>
                          Oct 25, 2021
                        </small>
                      </td>
                      <td className='actions-cell'>
                        <div className='buttons right nowrap'>
                          <Link to={routes.productListEdit.build(el.productId)}>
                            <button className='button small green' type='button'>
                              <span className='icon'>
                                <FiEdit />
                              </span>
                            </button>
                          </Link>
                          <button
                            className='button small red'
                            type='button'
                            onClick={() => deleteProduct(el.productId)}>
                            <span className='icon'>
                              <MdDeleteSweep />
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination />
          </div>
        </div>
      </section>
    </>
  );
}
