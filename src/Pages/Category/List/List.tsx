import { collection, getDocs, limit, query, startAfter, startAt } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { AiOutlinePlus } from 'react-icons/ai';
import ListHeader from 'Components/ProductListHeader';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

export default function CategoryList() {
   const [categoryList, setCategoryList] = useState<CategoryActionInterface[]>([]);

  const fetchData = async () => {
    const q = query(collection( db, 'category' ), limit(2));
    const queryData = await getDocs(q);
    const data = queryData.docs.map(i => i.data() as CategoryActionInterface);
    setCategoryList(data);
  };

  // Query the first page of docs
  const goToPreviousPage = async () => {
    const first = query(collection(db, 'category'), limit(2));
    const documentSnapshots = await getDocs(first);
    const data = documentSnapshots.docs.map(i => i.data() as CategoryActionInterface);
    setCategoryList(data);
    if (data)
      console.log('clicked previous');
  };
    // Get the last visible document
   const goToNextPage = async () => {
    const first = query(collection(db, 'category'), limit(2));
    const documentSnapshots = await getDocs(first);
     const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
     const next = query(collection(db, 'category'),
        startAfter(lastVisible),
        limit(2));
     const nextDocSnap = await getDocs(next);
     const nextDoc = nextDocSnap.docs.map(i => i.data() as CategoryActionInterface);
    setCategoryList(nextDoc);
    if (nextDoc)
      console.log('clicked next');
   }; 

  // for delete category
  // const onDelete = async (id: string) => {
  //   await deleteDoc(doc(db, 'category', String(id)));
  //   setCategoryList(categoryList.filter(d => d.id !== id));
  // };

  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <ListHeader />
    <div className='container mx-auto'>
      <div className='font-bold md:text-4xl sm:text-xl mt-10 mb-10 text-center'>Products Categories</div>
      {categoryList.length == 0 && <h2 className="text-center">No category is listed</h2>}
      <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
        {categoryList.map((el) => {
          return (
            <div className='max-w-sm rounded-2xl overflow-hidden shadow hover:shadow-lg' key={el.id}>
                <img className='w-full' src={el.categoryImage} alt='image' />
                <div className='px-6 py-2'>
                  <div className='font-bold text-xl mb-2'>
                    <Link to={routes.categoryDetails.build(String(el.id))}>
                    {el.categoryName}
                    </Link>
                  </div>
                  <p className='text-gray-700 text-base'>{el.categoryDesc}....</p>
                  {/* <div className="flex items-center mt-4">
                    <Link to={routes.categoryEdit.build(String(el.id))}
                    className="mr-3">Edit</Link>
                    <Button onClick={() => onDelete(String(el.id))}>Delete</Button>
                  </div> */}
                </div>
            </div>
          );
        })}
      </div>
      <div className='mt-10 mb-10 text-center flex justify-center text-xl'>
        <BiLeftArrowAlt className='mt-1 mr-2' onClick={goToPreviousPage} />
         
        <BiRightArrowAlt className='mt-1 ml-2' onClick={goToNextPage} />
      </div>
      
    </div>
    
    <Link to={routes.categoryCreate}
      className="bg-blue-600 text-white fixed right-6 bottom-6 rounded-lg p-3">
      <AiOutlinePlus />
    </Link>
    </>
  );
}
