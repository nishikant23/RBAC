import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import axios from "axios";


export const AdminPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    if(user?.role !== "ADMIN") {
        alert("Not Authorised");
        navigate("/dashboard", {replace: true});
    }
    useEffect(() => {
        const refreshAdminPage = async () => {
            try {
                const response = await axios.get("/adminPage", { withCredentials: true });
                // alert(response.data.message)
                console.log(response.data)
                navigate("/adminPage")
            } catch (error) {
                alert("Error fetching admin page. Please try again.")
                console.error("Error fetching admin page.", error)
                navigate("/dashboard")
            }
        }
        refreshAdminPage();
    },[navigate])


    return <div className="bg-sky-950 w-full h-screen flex justify-center space-x-6 ">
            <div className="fixed top-4 space-y-2 ">
                <div className="text-white text-center text-3xl font-semibold ">
                    Welcome to Admin's Page!
                </div> 
                <div className="text-sky-500 text-center font-bold uppercase text-4xl">
                    {user?.username}
                </div>
            </div>
    </div>
}