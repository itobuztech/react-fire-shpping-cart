import { signOut } from 'firebase/auth';
import { fireAuth } from 'lib/firebase';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';

export default function Logout() {
  const navigate = useNavigate();
  const user = fireAuth.currentUser;

  useEffect(() => {
    signOut(fireAuth)
    .then(() => {
      if (user) {
        alert('logout successfully');
        navigate(routes.login);
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
  }, [navigate, user]);

  return <div />;
}
