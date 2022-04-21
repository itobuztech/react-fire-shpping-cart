import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));
const Registration = React.lazy(() => import('./Pages/Auth/Register/Register'));
const ForgetPassword = React.lazy(() => import('./Pages/Auth/ForgetPassword/ForgetPassword'));
const PasswordReset = React.lazy(() => import('./Pages/Auth/ForgetPassword/ResetPassword'));

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>Loading</>}>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.registration}  element={<Registration />} />
            <Route path={routes.forgetpassword} element={<ForgetPassword />} />
            <Route path={routes.resetpassword} element={<PasswordReset />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
