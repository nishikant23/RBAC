import {useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import axios from "axios";

export const Logout = () => {
    const { setUser, setLoggingOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
             const response  = await axios.post(
                "http://localhost:3000/api/v1/user/logout",
                {},
                { withCredentials: true}
            )
            if(response.status === 200){
                alert("Logged Out Successfully.")
                setUser(null);
                navigate("/", { replace: true })
            } else {
                alert("Error in logging out the user. Please Try again.")
                console.log("Error in logging out the user. Please Try again.")
            }
            // window.location.href ="/home"  //Rediredts, casue we can't able to use Hooks inside Async-fn, and <> with Axios    
        } catch (error) {
            console.error("Logging out failed.", error);
        }finally {
            setLoggingOut(false); //reset back after user logsout
        }
    }

    return <div className="">
        <button onClick={handleLogout} 
        className="rounded-lg font-semibold bg-black text-center text-white text-md p-2 shadow-xl hover:bg-sky-500 transition hover:duration-300 hover:scale-110 ease-in-out hover:delay-100">
            Logout
        </button>
    </div>
}