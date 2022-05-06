/* eslint-disable @typescript-eslint/no-redeclare */
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));
const Registration = React.lazy(() => import('./Pages/Auth/Register/Register'));
const ForgetPassword = React.lazy(() => import('./Pages/Auth/ForgetPassword/ForgetPassword'));
const PasswordReset = React.lazy(() => import('./Pages/Auth/ForgetPassword/ResetPassword'));
const PostList = React.lazy(() => import('Pages/Post/List/List'));
const Product = React.lazy(() => import('Pages/Product/Product'));

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>Loading</>}>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.registration}  element={<Registration />} />
            <Route path={routes.forgetPassword} element={<ForgetPassword />} />
            <Route path={routes.resetPassword} element={<PasswordReset />} />
            <Route path={routes.listScreen} element={<PostList />} />
            <Route path={routes.product} element={<Product />} />
            <Route path={routes.productId} element={<Product />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
