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
                setCookie("token", response?.data?.token, 30);
                setCookie("id", response?.data?.user?.id, 30)
                setCookie("name", response?.data?.user?.name, 30);
                setCookie("role", response?.data?.user?.role, 30);
                setLoginUser({
                    name: response?.data?.user?.name,
                    token: response?.data?.token,
                    role: response?.data?.user?.role
                });

                toast.success(response?.message);
                setLoading(false);

                switch (response?.data?.user?.role?.trim()) {
                    case "Admin":
                        router.push('/dashboard/admin');
                        break;
                    case "Customer":
                        // router.push('/dashboard/customer');
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
        <div className="my-5 lg:my-15 flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight">Sign In</h2>
                    <p className="text-sm text-gray-500 mt-2">Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Link href="/forgotpass" className="text-sm font-medium text-sky-500 hover:text-sky-600 hover:underline transition-colors">
                                Forgot Password?
                            </Link>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isLoading}
                        className="w-full mt-2 bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isLoading && <SpinLoader />}
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <span className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="signup" className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-colors">
                            Sign Up
                        </Link>
                    </span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signin;