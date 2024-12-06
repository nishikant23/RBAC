import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar"
import { useAuth } from "../context/AuthContext"
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const refreshDashboard = async () => {
            try {
                const response = await axios.get("/dashboard", { withCredentials: true });
                // alert(response.data.message)
                console.log(response.data)
                navigate("/dashboard")
            } catch (error) {
                alert("Error fetching dashboard. Please try again.")
                console.error("Error fetching dashboard.", error)
                navigate("/signin")
            }
        }
        refreshDashboard();
    },[navigate])


    const handleAdminAccess = async ()  => {
        if(!user) {
            throw new Error("You need to login again. User Not found");
        }
        if(user?.role !== "ADMIN") {
            alert("User not authorised to access an Admin's Content.");
            return;
        }else{
            await navigate("/adminPage");
        }
    }
    const handleUserAccess = async () => {
        if(!user) {
            throw new Error("You need to login again. User Not found");
        }
        await navigate("/userPage");
    }

    return <div className="bg-sky-950 w-full h-screen">
        <div className="relative fixed top-4 z-10 w-full ">
            <Navbar/>
        </div>

        <div className="flex flex-col  justify-center items-center space-y-8 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="flex justify-center items-center space-x-3"> 
                <div className="text-white text-3xl font-semibold ">
                    Welcome to dashboard!
                </div> 
                <div className="text-sky-300 text-center font-bold uppercase text-4xl">
                    {user?.username}
                </div>
            </div>
            <div className="text-sky-300 text-center font-semibold uppercase text-xl">
                    {user?.role === "ADMIN" && <h3>You have an Admin Access.</h3>}
                    {user?.role === "USER" && <h3>You have an User Access.</h3>}
                </div>
            <div className="flex justify-center space-x-5 w-full ">
                <Button onClick={handleAdminAccess} btnLabel="Get Admin Contents"></Button>
                <Button onClick={handleUserAccess} btnLabel="Get User Contents"></Button>
            </div>
        </div>

        <div className=" fixed bottom-0 z-10 w-full">
            <Footer/>
        </div>
    </div>
}