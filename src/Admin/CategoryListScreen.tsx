import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { MdDeleteSweep } from 'react-icons/md';
import { Link } from 'react-router-dom';

import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import Button from 'Components/Button';
import { routes } from 'routes';
import Pagination from 'Components/Pagination';
import '../Styles/product-list-admin.css';
import { CategoryData } from 'Interface/category-data.interface';
import { db } from 'lib/firebase';

export default function CategoryListScreen() {
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);

  const fetchCategory = async () => {
    const getData = await getDocs(collection(db, 'categories'));
    const data = getData.docs.map((items) => items.data() as CategoryData);
    setCategoryList(data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const deleteCategory = async (categoryId: string) => {
    const result = doc(db, 'categories', categoryId);
    try {
      await deleteDoc(result);
      setCategoryList(categoryList.filter((items) => items.categoryId !== categoryId));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <ShoppingCartHeader />
      <div className='flex justify-center relative'>
        <div className='font-bold md:text-4xl sm:text-xl mt-10'>Products Categories</div>

        {/* Only visible for admin */}
        <div className='absolute right-6 mt-10'>
          <Link to={routes.categoryListForm}>
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
                  <th className='lg:w-5'></th>
                  <th className='image-cell border-b-0 lg:w-6'></th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((el) => {
                  return (
                    <tr key={el.categoryId}>
                      <td className='lg:w-5'></td>
                      <td className='image-cell p-4'>
                        <div className='image w-24 h-24 mx-auto lg:w-6 lg:h-6'>
                          <img src={el.Image} className='rounded-full' />
                        </div>
                      </td>
                      <td data-label='Product Name'>{el.CategoryName}</td>
                      <td data-label='Product Description'>{el.Description}</td>
                      <td data-label='Created'>
                        <small className='text-gray-500' title='Oct 25, 2021'>
                        {el.create_date}
                        </small>
                      </td>
                      <td className='actions-cell'>
                        <div className='buttons right nowrap'>
                          <Link to={routes.categoryListEdit.build(el.categoryId)}>
                            <button className='button small green' type='button'>
                              <span className='icon'>
                                <FiEdit />
                              </span>
                            </button>
                          </Link>

                          <button
                            className='button small red'
                            type='button'
                            onClick={() => deleteCategory(el.categoryId)}>
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
