import { ReactNode } from 'react';

export default function Button({
  type,
  children,
<<<<<<< HEAD
}: {
  children?: ReactNode;
  type?: 'button' | 'submit';
=======
  onClick,
}: {
  children?: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
}) {
  return (
    <button
      type={type ? type : 'submit'}
<<<<<<< HEAD
      className="group relative w-full flex justify-center py-2 px-4 border
        border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
         hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-500">
=======
      onClick={onClick ? () => onClick() : () => {}}
      className='relative flex justify-center py-2 px-4 border
        border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
         hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-500'>
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
      {children}
    </button>
  );
}
