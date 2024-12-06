import React, { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface SignupResponse {
  id: number,
  username : string,
  role : string,
}

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  // const [ error, setError ] = useState<string>("")
  const { setUser } = useAuth();

  const handleSignup = async () => {
      try {
         const respo = await axios.post<SignupResponse>("http://localhost:3000/api/v1/user/register", {
          username,
          password,
          role,
        }, { withCredentials : true})
        
        const responseData : SignupResponse = respo.data;
        console.log("Response Data = ", responseData)
        if(respo.status == 201) {
          setUser({id: responseData.id, username: responseData.username, role: responseData.role})
          alert("User Cretaed Successfully")
          navigate("/dashboard");
        }else{
          console.log("just Errror")
          alert("Error During Signing up, Please try after some time.")
        }
      } catch(error: unknown) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        alert(error.response.data.message)
      }
  }
  return (
    <div className="bg-sky-950 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Register"} />
          <Subheading label={"Enter your details to create an account"} />
          <Inputbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }} label={"Username"} placeholder={"Enter Username  .  .  ."} />
          <Inputbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Enter Password  .  .  ."} />
          <Inputbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRole(e.target.value);
          }} label={"Role"} placeholder={"Enter Admin Code/Leave Blank  .  .  ."} />
          {/* <Inputbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Enter password"} /> */}
          <div className="mt-4">
            <Button onClick={handleSignup} btnLabel={"Sign Up"} />
          </div>
          <BottomWarning label={"Already have an account?"} btmWarLabel={"Signin"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
