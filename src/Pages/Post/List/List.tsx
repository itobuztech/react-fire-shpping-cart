import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from 'routes';

export default function PostList() {
  return (
    <>
      <div>List</div>
      <div>
        <Link to={routes.logOut}>LogOut</Link>
      </div>
    </>
  );
}
