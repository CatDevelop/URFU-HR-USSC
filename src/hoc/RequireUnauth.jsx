import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';

const RequireAuth = ({children}) => {
  const user = useAuth();

  if (user.isAuth) {
    return <Navigate to='/tasks/my'/>;
  }

  return children;
};

export default RequireAuth;
