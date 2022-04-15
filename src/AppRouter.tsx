import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = React.lazy(() => import('./Pages/Auth/Login/Login'));

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>Loading</>}>

          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
