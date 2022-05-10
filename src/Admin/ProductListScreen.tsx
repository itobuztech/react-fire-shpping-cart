import React from 'react';
import faker from '@faker-js/faker';
import { FiEdit } from 'react-icons/fi';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import { MdDeleteSweep } from 'react-icons/md';
import Button from 'Components/Button';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import Pagination from 'Components/Pagination';
import '../Styles/product-list-admin.css';

export default function ProductListScreen() {
  const products = [...Array(8)].map(() => ({
    id: faker.datatype.uuid(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    quantity: faker.datatype.number(100),
    image: faker.image.business(600, 600),
    description: faker.lorem.words(4),
    rating: faker.datatype.number({ min: 0, max: 5 }),
  }));
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
                  <th className='checkbox-cell lg:w-5'>
                  </th>
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
                {products.map((el) => {
                  return (
                    <tr>
                      <td className='lg:w-5'>
                      </td>
                      <td className='image-cell'>
                        <div className='image w-24 h-24 mx-auto lg:w-6 lg:h-6'>
                          <img src={el.image} className='rounded-full' />
                        </div>
                      </td>
                      <td data-label='Product Name'>{el.productName}</td>
                      <td data-label='Product Description'>{el.description}</td>
                      <td data-label='Product Quantity'>{el.quantity}</td>
                      <td data-label='Product Price'>{el.price}</td>
                      <td data-label='Created'>
                        <small className='text-gray-500' title='Oct 25, 2021'>
                          Oct 25, 2021
                        </small>
                      </td>
                      <td className='actions-cell'>
                        <div className='buttons right nowrap'>
                          <Link to={routes.productListForm}>
                            <button className='button small green' type='button'>
                              <span className='icon'>
                                <FiEdit />
                              </span>
                            </button>
                          </Link>
                          <button className='button small red' type='button'>
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
