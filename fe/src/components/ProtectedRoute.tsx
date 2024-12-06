import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

interface ProtectedRouteProps {
    authorisedRoles : string[],
    children : React.ReactNode,
}
// const getAccessToken = () => {
//     const cookies = document.cookie.split('; ');
//     // eslint-disable-next-line prefer-const
//     for(let cookie of cookies){
//         const [name, value] = cookie.split('=');
//         if(name === 'accessToken'){
//             return value;
//         }
//     }
//     return null;
// }

export const ProtectedRoute = ({authorisedRoles, children} : ProtectedRouteProps) => {
    const { user, loggingOut } = useAuth();

    if(loggingOut){
        return null;
    }

    if(!user) {
        // alert("You are not authorised to enter. Kindly Register/Login.");
        return <Navigate to="/" replace />;
    }
    if(!authorisedRoles.includes(user!.role)) {
        // alert(" Need to login asgain.");
        return <Navigate to="/unauthorised" replace />;}

    return <>
        {children}
    </>
}