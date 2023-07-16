import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';

const RequireAdmin = ({children}) => {
  const user = useAuth();

  if (!user.isAuth || user.role === "employee") {
    return <Navigate to='/'/>;
  }

  return children;
};

export default RequireAdmin;
