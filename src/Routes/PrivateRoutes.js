import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

export const PrivateRoutes = ({children}) => {
    const { user } = useContext(AuthContext);
    //user.logged = user.logged ? user.logged : false;
    return user
        ? children
        : <Navigate to='/home'></Navigate>
}
