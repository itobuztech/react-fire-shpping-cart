import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../Components/ContentHeader';
import { database } from '../firebase';
import { routes } from '../routes';

export default function ListScreen() {
const navigate = useNavigate();
  // const handleLogOut = async () => {
  //  signOut(database)
  //   .then(() => {
  //     console.log('you are logged in');
  //     alert('you are logged in');
  //     navigate(routes.login);
  //   })
  //   .catch((error) => {
  //     // const errorCode = error.code;
  //     // const errorMessage = error.message;
  //     console.log(error.message);
  //   });
  // };
  useEffect(() => {
    onAuthStateChanged(database, (user) => {
      if (user) {
        navigate(routes.listscreen);
      }
       if (! user) {
       navigate(routes.login);
      }
    });
});
  
  return (
    <div><ContentHeader/><div className='text-center'>
      <h2 className='text-3xl font-extrabold pt-'> Welcome to the CMS Portal</h2></div>
    <button>SignOut</button></div>
  );
}
