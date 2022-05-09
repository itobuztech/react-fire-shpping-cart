import ProductListHeader from 'Components/ProductListHeader';
import { doc, getDoc } from 'firebase/firestore';
import { CategoryActionInterface } from 'Interface/categoryaction.interface';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryDetails() {
  const { id } = useParams();
  const [categoryData, setCategoryDate] = useState<CategoryActionInterface>();

  useEffect(() => {
    (async () => {
      const docRef = doc(db, 'category', String(id));
      const docSnap = await getDoc(docRef);
      const category = docSnap.data() as unknown as CategoryActionInterface;
      setCategoryDate(category);
    })();
  }, [id]);

  return (
    <>
    <ProductListHeader />
    <div className="container mx-auto">
      <img src={categoryData?.categoryImage} />
      <h1>{categoryData?.categoryName}</h1>
      <p>{categoryData?.categoryDesc}</p>
    </div>
    </>
  );
}
