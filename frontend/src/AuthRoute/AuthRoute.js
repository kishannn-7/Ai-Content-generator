import React from 'react'
import { useAuth } from '../AuthContext/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';
import AuthCheckingComponent from '../components/Alert/AuthCheckingComponent';

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, isLoading, isError, isSuccess } = useAuth();
    if (isLoading || isAuthenticated === null) {

        console.log("AuthRoute: Loading");
        return <AuthCheckingComponent />
    }
    if (isError || !isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
}

export default AuthRoute