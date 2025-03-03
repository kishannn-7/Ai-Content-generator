import { createContext, useContext, useEffect, useState } from "react";
import { checkUserAuthStatusAPI } from "../apis/user/usersAPI";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    //Make request using react query
    const { isLoading, isError, data, isSuccess } = useQuery({
        queryFn: checkUserAuthStatusAPI,
        queryKey: ["checkAuth"],
    })
    //Update the user
    useEffect(() => {
        if (!isLoading && !isError) {
            setIsAuthenticated(data)
        }
    }, [isLoading, isError, data])

    //Update the user auth after login
    const login = () => {
        setIsAuthenticated(true)
    }
    //Update the user auth after login
    const logout = () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, isError, isLoading,
            isSuccess, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )

};

//Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
}