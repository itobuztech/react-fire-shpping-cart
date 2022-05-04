import Button from 'Components/Button';
import ListHeader from 'Components/ListHeader';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { AiOutlinePlus } from 'react-icons/ai';

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<CategoryActionInterface[]>([]);
  
  const fetchData = async () => {
    const q = await getDocs(collection( db, 'category' ));
    const data = q.docs.map(i => i.data() as CategoryActionInterface);
    setCategoryList(data);
  };

  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, 'category', String(id)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <ListHeader />
    <div className="container mx-auto p-2">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
       {categoryList && categoryList.map(item => {
         return (
           <li key={item.id} className="border-b border-slate-300 p-2">
             <img src={item.categoryImage} className="" />
             <h2 className="font-bold">{item.categoryName}</h2>
             <p className="text-sm">{item.categoryDesc}</p>
             
             <div className="flex items-center mt-4">
              <Link to={routes.categoryEdit.build(String(item.id))}
               className="mr-3">Edit</Link>
              <Button onClick={() => onDelete(String(item.id))}>Delete</Button>
             </div>
           </li>
         );
        })
       } 
      </ul>
    </div>
    <Link to={routes.categoryCreate}
      className="bg-blue-600 text-white fixed right-6 bottom-6 rounded-lg p-3">
      <AiOutlinePlus />
    </Link>
    </>
  );
}
