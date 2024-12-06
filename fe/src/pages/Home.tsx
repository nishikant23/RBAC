// import { Link } from "react-router-dom"
import { Appbar } from "../components/Appbar"

export const Home = () => {
    return <div className="absolute w-full min-h-screen overflow-hidden">
                <img className="object-cover h-screen w-full  -z-10" 
                src="https://img.freepik.com/premium-vector/modern-dark-blue-abstract-geometric-background-with-dark-modern-triangle-texture-elegant-website-style-vector-design_116849-1059.jpg" 
                alt="Home image"/>

                <div className="space-y-12 xl:space:y-0 flex flex-col justify-center ">
                    <div className="w-full fixed top-12 h-max flex justify-center z-10">
                            <Appbar/>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  flex flex-col justify-center items-center h-screen space-x-0 space-y-16 xl:flex-row xl:space-x-8 xl:space-y-0 w-[90%] max-w-screen-lg">
                        <div className="w-1/2 xl:w-full">
                            <img className="cover h-[250px] w-[400px] shadow-lg rounded-lg "
                            src="https://cdn.prod.website-files.com/5c9200c49b1194323aff7304/61e00e194e1ac414b380926d_RBAC-570x330.png"
                            alt="CTO  image"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center text-left xl:text-left space-y-8 w-1/2 xl:w-full">
                            <div className="text-4xl font-bold text-white hover:text-sky-300 text-center xl:text-left">
                                Role based access control
                            </div>
                            <div className="ttext-xl font-semibold text-white break-words max-w-md text-center xl:text-left">
                                A model that allows users to access systems and data based on their role. It can be used to protect resources like web applications, APIs, and single-page applications (SPAs)
                            </div>
                        </div>
                    </div>
                </div>
    </div>
}