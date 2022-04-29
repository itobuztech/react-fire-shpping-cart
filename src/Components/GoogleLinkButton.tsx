import { ReactNode } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleLinkButton({
  type,
  children,
  onClick,
}: {
  children?: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
}) {
  return (
    <>
      <div>
        <button
          type={type ? type : 'submit'}
          onClick={onClick ? () => onClick() : () => {}}
          className='relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md bg-gray-200
         hover:bg-gray-300'>
          <div className='text-2xl mr-2'>
            <FcGoogle />
          </div>
          {children}
        </button>
      </div>
    </>
  );
}
