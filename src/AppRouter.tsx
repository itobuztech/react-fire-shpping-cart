import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthGuard from 'Guard/AuthGuard';
import UnAuthGuard from 'Guard/UnAuthGuard';
import { routes } from './routes';

const Home = React.lazy(() => import('./Pages/Home'));

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));
const Registration = React.lazy(() => import('./Pages/Auth/Register/Register'));
const ForgetPassword = React.lazy(() => import('./Pages/Auth/ForgetPassword/ForgetPassword'));
const EmailVerification = React.lazy(() => import('./Components/EmailVerification'));
const PostList = React.lazy(() => import('./Pages/Post/List/ProductList'));
const ProductCart = React.lazy(() => import('./Components/ProductCart'));
const ProductDetailsScreen = React.lazy(() => import('./Components/ProductDetailsScreen'));
const Logout = React.lazy(() => import('./Pages/Auth/Logout/Logout'));

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>Loading</>}>
          <Routes>
            <Route path={routes.home} element={<Home />}>
              <Route path={routes.home} element={<Login />} />
            </Route>
            <Route path={routes.login} element={<UnAuthGuard />}>
              <Route path={routes.login} element={<Login />} />
            </Route>
            <Route path={routes.registration} element={<Registration />} />
            <Route path={routes.forgetPassword} element={<ForgetPassword />} />
            <Route path={routes.emailVerification} element={<AuthGuard />}>
              <Route path={routes.emailVerification} element={<EmailVerification />} />
            </Route>
            <Route path={routes.listScreen} element={<AuthGuard />}>
              <Route path={routes.listScreen} element={<PostList />} />
            </Route>
            <Route path={routes.productCart} element={<AuthGuard />}>
              <Route path={routes.productCart} element={<ProductCart />} />
            </Route>
            <Route path={routes.productDetailsScreen} element={<AuthGuard />}>
              <Route path={routes.productDetailsScreen} element={<ProductDetailsScreen />} />
            </Route>
            <Route path={routes.logOut} element={<Logout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
