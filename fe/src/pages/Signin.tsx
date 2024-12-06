import React, { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

interface SigninResponse {
    id: number,
    username: string,
    role : string,
}

export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const  { setUser } = useAuth();

    const handleSignin = async () => {
      try {
                
        const response  = await axios.post<SigninResponse>("http://localhost:3000/api/v1/user/signin", {
          username,
          password,        
        }, {  withCredentials: true })

        

        if (response.status == 200) {
          const responseData : SigninResponse = response.data;
          console.log("Response Data = ", responseData)
          setUser({id: responseData.id, username: responseData.username, role: responseData.role})
          alert("Login Successfull");
          console.log("Login Successfull ")
        } else {
          alert("Login Failed");
          console.log("Login Failed ")
        }
        
        // alert(typeof responseData) //object destructing
        // console.log(`Login Return >>>> id: ${responseData.id}, username: ${responseData.username}, role: ${responseData.role}`)
        // alert(`Login Return >>>> id: ${responseData.id}, username: ${responseData.username}, role: ${responseData.role}`)
        navigate("/dashboard");
      } catch(error: unknown) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        alert(error.response.data.message)
        // if(isAxiosErrorType(error)){
        //   if(error.response && error.response.data) {
        //     alert(error.response.data.message)
        //   }else {
        //     alert("Unexpected server issue. Please try again.")
        //   }
        // }
      }
    }

    return <div className="bg-sky-950 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white text-center h-max w-80 p-4 px-4">
                <Heading label={"Sign In"}/>
                <Subheading label={"Enter credentials your to login"}/>
                <Inputbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                }}
                label={"Username"} placeholder={"Enter username"}/>
                <Inputbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"Enter password"}/>
                <div className="mt-4">
                    <Button onClick={handleSignin} btnLabel={"Sign In"}/>
                </div>
                <BottomWarning  label={"Don't have an account? "} btmWarLabel={"Register"} to={"/register"}/>
            </div>
        </div>

    </div>
}