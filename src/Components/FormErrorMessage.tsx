import { ReactNode } from 'react';

export default function FormErrorMessage({ children }: { children?: ReactNode }) {
  return <>{children ? <div className='text-red-600 text-base mb-3'>{children} </div> : <></>}</>;
}
