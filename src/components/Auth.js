import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';
export default function withAuth(Component){
    const AuthRoute = () => {
      const isAuth = !!localStorage.getItem("token");
      console.log(localStorage);
      if (isAuth) {
        return <Component />;
      } else {
        return <Navigate to="/NoPermission" />;
      }
    };
  
    return AuthRoute;
  };