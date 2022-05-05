import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthGuard from 'Guard/AuthGuard';
import UnAuthGuard from 'Guard/UnAuthGuard';
import EmailGuard from 'Guard/EmailGuard';
import { routes } from './routes';

const Home = React.lazy(() => import('./Pages/Home'));

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));
const Registration = React.lazy(() => import('./Pages/Auth/Register/Register'));
const ForgetPassword = React.lazy(() => import('./Pages/Auth/ForgetPassword/ForgetPassword'));
const EmailVerification = React.lazy(() => import('./Components/EmailVerification'));
const NumberVerification = React.lazy(() => import('./Components/NumberVerification'));
const ProductList = React.lazy(() => import('./Pages/ProductList/ProductList'));
const ProductListForm = React.lazy(() => import('./Admin/ProductListForm'));
const ProductCart = React.lazy(() => import('./Components/ProductCart'));
const ProductDetailsScreen = React.lazy(() => import('./Pages/ProductList/ProductDetailsScreen'));
const UserProfile = React.lazy(() => import('./UserProfile/UserProfile'));
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
            <Route path={routes.numberVerification} element={<NumberVerification />} />
            <Route path={routes.emailVerification} element={<EmailGuard />}>
              <Route path={routes.emailVerification} element={<EmailVerification />} />
            </Route>
            <Route path={routes.listScreen} element={<AuthGuard />}>
              <Route path={routes.listScreen} element={<ProductList />} />
            </Route>
            <Route path={routes.productCart} element={<AuthGuard />}>
              <Route path={routes.productCart} element={<ProductCart />} />
            </Route>
            <Route path={routes.productDetailsScreen} element={<AuthGuard />}>
              <Route path={routes.productDetailsScreen} element={<ProductDetailsScreen />} />
            </Route>

            {/* Only visible for admin - product list create screen */}
            <Route path={routes.productListForm} element={<AuthGuard />}>
            <Route path={routes.productListForm} element={<ProductListForm />} />
            </Route>
             {/* Only visible for admin - product list create screen end */}

             {/*User profile */}
             <Route path={routes.userProfile} element={<AuthGuard />}>
            <Route path={routes.userProfile} element={<UserProfile />} />
            </Route>
              {/*User profile end */}

            <Route path={routes.logOut} element={<Logout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
