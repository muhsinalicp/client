import { createContext, useState } from "react";



export const AuthContext = createContext(
    {
        isAuth:false,
        setIsAuth:()=>{}
    }
);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

