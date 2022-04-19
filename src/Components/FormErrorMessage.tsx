import { ReactNode } from 'react';

export default function FormErrorMessage({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <div
      className="text-red-600 text-base mb-3">
      {children}
    </div>
  );
}
