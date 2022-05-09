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
