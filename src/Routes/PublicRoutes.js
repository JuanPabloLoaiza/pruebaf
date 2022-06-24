import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

export const PublicRoutes = ({children}) => {
    const { user } = useContext(AuthContext);
    return user?.logged === false
        ? children
        : <Navigate to='/home'></Navigate>
}