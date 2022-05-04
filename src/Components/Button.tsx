import { ReactNode } from 'react';
import { ImSpinner7 } from 'react-icons/im';

export default function Button({
  type,
  children,
  onClick,
  disabled,
  loading
}: {
  children?: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      type={type ? type : 'submit'}
      onClick={onClick ? () => onClick() : () => {}}
      disabled={disabled}
      className='relative flex justify-center py-2 px-4 border items-center
        border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
         hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-500'>
      {children}
      {loading ? <ImSpinner7 className="animate-spin ml-2" /> : ''}
    </button>
  );
}
