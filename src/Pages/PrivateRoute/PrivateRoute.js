import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const user = '';
    return user ? children : <Navigate to='/' replace />;
}
