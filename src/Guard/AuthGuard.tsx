import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'Store/store';

import { routes } from 'routes';

export default function AuthGuard() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user === null) {
    return <Navigate to={routes.login} />;
  } else if (user?.uid) {
    return <Outlet />;
  } else {
    return <>'... loading' </>;
  }
}
