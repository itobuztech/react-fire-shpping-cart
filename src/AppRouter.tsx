import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgetPassword from './Pages/Auth/ForgetPassword/ForgetPassword';
import Register from './Pages/Auth/Register/Register';

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>Loading</>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
