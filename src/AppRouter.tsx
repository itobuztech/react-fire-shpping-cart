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
const CategoryAction = React.lazy(() => import('./Pages/Category/Action/Action'));
const CategoryList = React.lazy(() => import('./Pages/Category/List/List'));
const CategoryDetail = React.lazy(() => import('./Pages/Category/Details/Details'));
const EmailVerification = React.lazy(() => import('./Components/EmailVerification'));
const PhoneNumberVerification = React.lazy(() => import('./Components/PhoneNumberVerification'));
const ProductList = React.lazy(() => import('./Pages/ProductList/ProductList'));
const ProductCategoryList = React.lazy(() => import('./Pages/Categories/ProductCategoryList'));
const CartItem = React.lazy(() => import('./Cart/CartItem'));
const CheckoutScreen = React.lazy(() => import('./Cart/CheckoutScreen'));
const ProductDetailsScreen = React.lazy(() => import('./Pages/ProductList/ProductDetailsScreen'));
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
            <Route path={routes.categoryCreate} 
            element={<CategoryAction />} />
            <Route path={routes.categoryEdit.match} element={<CategoryAction />} />
            <Route path={routes.categoryList} element={<CategoryList />} />
            <Route path={routes.categoryDetails.match} element={<CategoryDetail />} />

            {/*Phone number verification */}
            <Route path={routes.numberVerification} element={<PhoneNumberVerification />} />
            {/*Phone number verification end */}

            {/*Email verification */}
            <Route path={routes.emailVerification} element={<EmailGuard />}>
              <Route path={routes.emailVerification} element={<EmailVerification />} />
            </Route>
            {/*Email verification end */}

            {/*Product list */}
            <Route path={routes.listScreen} element={<AuthGuard />}>
              <Route path={routes.listScreen} element={<ProductList />} />
            </Route>
            {/*Product list end */}

            {/*Product category list */}
            <Route path={routes.productCategoryList} element={<AuthGuard />}>
              <Route path={routes.productCategoryList} element={<ProductCategoryList />} />
            </Route>
            {/*Product category list end */}

            {/*Product Cart */}
            <Route path={routes.cartItem} element={<AuthGuard />}>
              <Route path={routes.cartItem} element={<CartItem />} />
            </Route>
            {/*Product Cart end */}

            {/*Product details screen */}
            <Route path={routes.productDetailsScreen} element={<AuthGuard />}>
              <Route path={routes.productDetailsScreen} element={<ProductDetailsScreen />} />
            </Route>
            {/*Product details screen end */}

            {/*Checkout screen */}
            <Route path={routes.checkoutScreen} element={<AuthGuard />}>
              <Route path={routes.checkoutScreen} element={<CheckoutScreen />} />
            </Route>
            {/*Checkout screen end */}

            <Route path={routes.logOut} element={<Logout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
