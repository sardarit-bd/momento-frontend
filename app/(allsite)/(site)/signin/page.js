'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoadingStore from "../../../../store/useLoadingStore";
import setCookie from "../../../../utilis/helper/cookie/setcookie";
import logingandsignupmakepost from "../../../../utilis/requestrespose/logingandsignupmakepost";

import SpinLoader from "@/app/componnent/SpingLoader";
import useLogedUserStore from "@/store/useLogedUser";
import { toast, ToastContainer } from "react-toastify";

const { useState } = require("react");

const Signin = () => {

    const router = useRouter();
    const { isLoading, setLoading } = useLoadingStore();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
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

                switch (response?.data?.user?.role?.trim()) {
                    case "Admin":
                        router.push('/deshboard/admin');
                        break;
                    case "Customer":
                        // router.push('/deshboard/customer');
                        router.push('/shop');
                        break;
                    default:
                        break;
                }

            } else {
                setLoading(false);
                toast.error("Something Went Wrong!");
            }
        } else {
            toast.warn("Required All Feilds");
        }

    };


    return (
        <div className="w-screen h-[60vh] flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-xl text-black font-bold mb-4">Sign In</h2>

                <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
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

                <span className="flex text-gray-600 items-center gap-1 pt-2 justify-center">Do not have an account ? <Link href="signup" className="text-sm text-gray-600 hover:underline text-sky-500">
                    Sign Up
                </Link></span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signin;
