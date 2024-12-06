import React, { createContext, ReactNode, useContext, useState } from "react";


interface User {
    id: number, 
    username: string, 
    role: string
}
interface AuthContextTypes  {
    user:  User | null;
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
    loggingOut: boolean;
    setLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
    // loading : boolean;
    // setLoading : React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext  = createContext<AuthContextTypes | undefined>(undefined);


export const AuthProvider = ({children} : {children :ReactNode}) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ loggingOut, setLoggingOut ] = useState(false);
    // const [ loading, setLoading ] = useState(false);
    // const navigate = useNavigate();

    // useEffect(()=>{
    //     const authCheck = async () => {
    //         try {
    //             setLoading(true);
    //             const response  =  await axios.get("/authenticate", {withCredentials: true})
    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //             //@ts-expect-error
    //             if(response.data?.isValid){
    //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //                 //@ts-expect-error
    //                 setUser(response.data.user)
    //             }else{
    //                 setUser(null);
    //                 navigate("/signin");
    //             }
    //         } catch (error) {
    //             console.error("Error checking auth status:", error);
    //             setUser(null);
    //             navigate("/signin");
    //         }finally{
    //             setLoading(false);
    //         }
    //     }
    //     authCheck()
    // },[navigate])

    return <AuthContext.Provider value={{user, setUser, loggingOut, setLoggingOut}}>
        {children}
    </AuthContext.Provider>
} 

export const useAuth = (): AuthContextTypes  => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error(" useAuth should be usind inside AuthProvider")
    }
    return context;
}
