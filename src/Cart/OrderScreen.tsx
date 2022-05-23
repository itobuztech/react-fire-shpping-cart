import Button from 'Components/Button';
import ShoppingCartHeader from 'Components/ShoppingCartHeader';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

export default function OrderScreen() {
  return (
    <>
    <ShoppingCartHeader />
    <div>
      <div className='flex justify-center font-semibold text-4xl mt-16'>Order Placed</div>
      <div className='mt-8 flex justify-center'>
      <Link to={routes.listScreen}><Button>Back to Home</Button></Link>
      </div>
    </div>
    </>
    
  );
}
