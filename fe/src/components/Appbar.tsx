import { Link } from "react-router-dom"

export const Appbar = () => {
    return  <div className="w-max h-max justify-center px-6 py-4 bg-sky-500 transparent bg-opacity-100 rounded-lg mt-4 hover:scale-110 transition hover:duration-500 ease-in-out  ">
        <div className="flex justify-between text-xl font-bold text-white space-x-6">
            <p className="px-2  transition hover:scale-110 hover:duration-300 hover:delay-100 cursor-pointer ease-in-out">
               <Link to="/">Home</Link> </p>
            <p className="px-2  transition hover:scale-110 hover:duration-300 hover:delay-100 cursor-pointer ease-in-out">
                <Link to="/signin">Signin</Link>
            </p>
            <p className="px-2  transition hover:scale-110 hover:duration-300 hover:delay-100 cursor-pointer ease-in-out">
                <Link to="/register">Register</Link>
            </p>
        </div>
    </div>
}