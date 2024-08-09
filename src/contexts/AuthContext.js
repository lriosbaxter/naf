import React, {useState, useEffect, createContext} from "react";
import { deleteToken, getToken, setToken } from "../api/token";
import { useUser } from "../hooks";
import { getMeApi } from "../api/user";

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
});



export function AuthProvider(props) {
    const { children } = props;
    const [auth, setAuth] = useState(undefined)
    const { getMe } = useUser();

    useEffect(() => {
        (async () => {
            const token = getToken();
            console.log(token)
            if(token){
                const userData = await getMeApi(token)
                setAuth({ token, userData })
            } else {
                setAuth(null);
            }
        })()
    }, [])

    const login = async (token) => {
        setToken(token)
        const userData = await getMe(token);
        setAuth({token, userData});
        console.log(userData)
    }

    const logout = async (token) => {
        if(auth){
            deleteToken();
            setAuth(null);
        }
    }

    const valueContext = {
        auth,
        login,
        logout,
    };

    if(auth === undefined) return null

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}
