import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';
export default function withAuth(Component){
    const AuthRoute = () => {
      const isAuth = !!localStorage.getItem("token");
      if (isAuth) {
        return <Component />;
      } else {
        return <Navigate to="/NoPermission" />;
      }
    };
  
    return AuthRoute;
  };