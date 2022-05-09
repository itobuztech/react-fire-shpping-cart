import { ReactNode } from 'react';

export default function FormErrorMessage({ children }: { children?: ReactNode }) {
<<<<<<< HEAD
  return <>{children ? <div className='text-red-600 text-base mb-3'>{children} </div> : <></>}</>;
=======
  return <>{children ? <div className='text-red-600 text-base pb-2'>{children} </div> : <></>}</>;
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
}
