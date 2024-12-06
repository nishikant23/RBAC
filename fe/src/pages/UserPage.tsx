// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    // const reload = window.location.reload();
    useEffect(() => {
        const refreshUserPage = async () => {
            try {
                const response = await axios.get("/userPage", { withCredentials: true });
                // alert(response.data.message)
                console.log(response.data)
                navigate("/userPage")
            } catch (error) {
                alert("Error fetching user page. Please try again.")
                console.error("Error fetching user page.", error)
                navigate("/dashboard")
            }
        }
        refreshUserPage();
    },[ navigate])
    
    return <div className="bg-sky-950 w-full h-screen flex justify-center space-x-6 ">
                <div className="fixed top-4 space-y-2 ">
                    <div className="text-white text-center text-3xl font-semibold ">
                        Welcome to Users's Page!
                    </div> 
                    <div className="text-sky-500 text-center font-bold uppercase text-4xl">
                        {user?.username}
                    </div>
                </div>
        </div>
}