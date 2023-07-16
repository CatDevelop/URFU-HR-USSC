import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';

const Redirection = () => {
  const user = useAuth();

  if (!user.isAuth) {
    return <Navigate to='/login'/>;
  }

  return <Navigate to='/tasks/my'/>;
};

export default Redirection;
