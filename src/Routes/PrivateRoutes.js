import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

export const PrivateRoutes = ({children}) => {
    const { user } = useContext(AuthContext);
    //user.logged = user.logged ? user.logged : false;
    return user?.logged === true
        ? children
        : <Navigate to='/login'></Navigate>
}
