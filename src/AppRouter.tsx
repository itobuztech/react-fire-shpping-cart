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
const PhoneNumberVerification = React.lazy(() => import('./Components/PhoneNumberVerification'));
const ProductListForm = React.lazy(() => import('./Admin/ProductListForm'));
const OrderListScreen = React.lazy(() => import('./Admin/OrderListScreen'));
const ProductListScreen = React.lazy(() => import('./Admin/ProductListScreen'));
const CategoryListScreen = React.lazy(() => import('./Admin/CategoryListScreen'));
const UserProfile = React.lazy(() => import('./UserProfile/UserProfile'));
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
            <Route path={routes.phoneNumberVerification} element={<PhoneNumberVerification />} />

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

            {/*Checkout screen */}
            <Route path={routes.checkoutScreen} element={<AuthGuard />}>
              <Route path={routes.checkoutScreen} element={<CheckoutScreen />} />
            </Route>
            {/*Product Cart end */}

            {/*Product details screen */}
            <Route path={routes.productDetailsScreen} element={<AuthGuard />}>
              <Route path={routes.productDetailsScreen} element={<ProductDetailsScreen />} />
            </Route>

            {/* Only visible for admin - product list create screen */}
            <Route path={routes.productListForm} element={<AuthGuard />}>
              <Route path={routes.productListForm} element={<ProductListForm />} />
            </Route>
            {/* Only visible for admin - product list create screen end */}

            {/* Only visible for admin - order list screen */}
            <Route path={routes.oderListScreen} element={<AuthGuard />}>
              <Route path={routes.oderListScreen} element={<OrderListScreen />} />
            </Route>
            {/* Only visible for admin - order list screen end */}

            {/* Only visible for admin - product list screen */}
            <Route path={routes.productListScreen} element={<AuthGuard />}>
              <Route path={routes.productListScreen} element={<ProductListScreen />} />
            </Route>
            {/* Only visible for admin - product list screen end */}

              {/* Only visible for admin - category list screen */}
              <Route path={routes.categoryListScreen} element={<AuthGuard />}>
              <Route path={routes.categoryListScreen} element={<CategoryListScreen />} />
            </Route>
            {/* Only visible for admin - category list screen end */}

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
