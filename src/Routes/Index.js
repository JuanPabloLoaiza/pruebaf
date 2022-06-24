import { Routes, Route } from 'react-router-dom';
import { Login } from '../Components/Login/Login';
import { Register } from '../Components/Register/Register';
import { AppRoutes } from './AppRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';


export const Index = () => {
    return (
        <Routes>
            <Route path='/login' element={
                <PublicRoutes>
                    <Login />
                </PublicRoutes>
            } />
            <Route path='/register' element={
                <PublicRoutes>
                    <Register />
                </PublicRoutes>
            } />
            <Route path='/' element={
                <PublicRoutes>
                    <Login />
                </PublicRoutes>
            } />
            <Route path='/*' element={
                <PrivateRoutes>
                    <AppRoutes />
                </PrivateRoutes>} />
        </Routes>
    )
}