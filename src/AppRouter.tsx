import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthGuard from 'Guard/AuthGuard';
import UnAuthGuard from 'Guard/UnAuthGuard';
import { routes } from './routes';

const Home = React.lazy(() => import('./Pages/Home'));

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));
const Registration = React.lazy(() => import('./Pages/Auth/Register/Register'));
const ForgetPassword = React.lazy(() => import('./Pages/Auth/ForgetPassword/ForgetPassword'));
const PasswordReset = React.lazy(() => import('./Pages/Auth/ForgetPassword/ResetPassword'));
const PostList = React.lazy(() => import('./Pages/Post/List/List'));
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
            <Route path={routes.resetPassword} element={<PasswordReset />} />
            <Route path={routes.listScreen} element={<AuthGuard />}>
              <Route path={routes.listScreen} element={<PostList />} />
            </Route>
            <Route path={routes.logOut} element={<Logout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
