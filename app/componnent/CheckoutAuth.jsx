
'use client'

import SpinLoader from "@/app/componnent/SpingLoader";
import useLoadingStore from "@/store/useLoadingStore";
import useLogedUserStore from "@/store/useLogedUser";
import setCookie from "@/utilis/helper/cookie/setcookie";
import logingandsignupmakepost from "@/utilis/requestrespose/logingandsignupmakepost";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";



const { useState, use } = require("react");

const CheckoutAuth = () => {

    const [state, setstate] = useState('login');
    const router = useRouter();
    const { isLoading, setLoading } = useLoadingStore();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState('');
    const [res, setres] = useState(false);




    const handleLogin = async (e) => {
        e.preventDefault();

        if (email && password) {
            setLoading(true);
            const response = await logingandsignupmakepost("api/login", { email, password });

            if (response) {
                setCookie("token", response?.data?.token, 1);
                setCookie("id", response?.data?.user?.id, 1)
                setCookie("name", response?.data?.user?.name, 1);
                setCookie("role", response?.data?.user?.role, 1);
                setLoginUser({
                    name: response?.data?.user?.name,
                    token: response?.data?.token,
                    role: response?.data?.user?.role
                });

                toast.success(response?.message);
                setLoading(false);

            } else {
                setLoading(false);
                toast.error("Something Went Wrong!");
            }
        } else {
            toast.warn("Required All Feilds");
        }

    };





    const handleSubmit = async (e) => {
        e.preventDefault();


        if (name && email && password) {
            setLoading(true);
            const response = await logingandsignupmakepost("api/register", { name, email, password });
            if (response) {
                setres(response);
                setLoading(false);
                setstate('login');
            } else {
                setLoading(false);
                alert("There was a Server side Problem");
            }
        } else {
            alert("Required All Feilds");
        }

    };





    return (
        <div>

            {
                state === 'login' ? (

                    <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                        <h2 className="text-xl text-black font-bold mb-4">Sign IN</h2>

                        <form onSubmit={handleLogin} className="space-y-4 text-gray-600">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                            />


                            <button
                                disabled={isLoading}
                                className="w-full bg-sky-400 text-white font-semibold py-2 rounded-md hover:bg-sky-600 transition cursor-pointer flex items-center justify-center gap-2"
                            >

                                {
                                    isLoading && <SpinLoader />
                                }


                                Login
                            </button>
                        </form>

                        <Link href="/forgotpass" className="block mt-3 text-sm text-gray-600 hover:underline">
                            Forget Password
                        </Link>

                        <span className="flex text-gray-600 items-center gap-1 pt-2 justify-center">Did not have an account ? <span onClick={() => setstate('signup')} className="text-sm text-gray-600 curosr-pointer hover:underline text-sky-500">
                            sign Up
                        </span></span>
                    </div>


                ) : (

                    <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                        <h2 className="text-xl text-black font-bold mb-4">Sign Up</h2>

                        <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                            />

                            <button
                                disabled={isLoading}
                                className="w-full bg-sky-400 text-white font-semibold py-2 rounded-md hover:bg-sky-600 transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                {
                                    isLoading && <SpinLoader />
                                }

                                Sign Up
                            </button>
                        </form>

                        <span className="flex items-center text-gray-500 gap-1 pt-2 justify-center">Already have an Account ? <span onClick={() => setstate('login')} className="text-sm hover:underline curosr-pointer text-sky-500">
                            sign In
                        </span></span>
                    </div>
                )
            }
            <ToastContainer position="bottom-right" />
        </div>
    )
}



export default CheckoutAuth;