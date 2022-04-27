import { ReactNode } from 'react';

export default function CartButton({ type, children }: { children?: ReactNode; type?: 'button' | 'submit' }) {
  return (
    <button
      type={type ? type : 'submit'}
      className='font-bold text-sm bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700'>
      {children}
    </button>
  );
}
