import Button from 'Components/Button';
import { collection, getDocs } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<CategoryActionInterface[]>([]);
  
  const fetchData = async () => {
    const q = await getDocs(collection( db, 'category' ));
    const data = q.docs.map(i => i.data() as CategoryActionInterface);
    setCategoryList(data);
  };

  const onDelete = (id: string) => {

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-2">
      <ul>
       {categoryList && categoryList.map(item => {
         return (
           <li key={item.id} className="border-b border-slate-300 p-2">
             <h2 className="font-bold">{item.categoryName}</h2>
             <p className="text-sm">{item.categoryDesc}</p>
             <Link to={routes.categoryEdit.build(String(item.id))}>Edit</Link>
             <Button onClick={() => onDelete(String(item.id))}>Delete</Button>
           </li>
         );
        })
       } 
      </ul>
    </div>
  );
}
