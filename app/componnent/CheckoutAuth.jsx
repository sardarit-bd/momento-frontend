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
        /* 
           Added: fixed inset-0, z-50, backdrop-blur-md, and bg-gray-900/50 
           This locks it to the screen and blurs everything behind it 
        */
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900/50 backdrop-blur-md p-4">
            
            <div className="w-full max-w-md mx-auto relative">
                {state === 'login' ? (
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 w-full transition-all duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight">Sign In</h2>
                            <p className="text-sm text-gray-500 mt-2">Log in to complete your checkout securely.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            
                            {/* Email Input */}
                            <div>
                                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="login-email"
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
                                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Link href="/forgotpass" className="text-sm font-medium text-sky-500 hover:text-sky-600 hover:underline transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <input
                                    id="login-password"
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
                                className="w-full mt-4 bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLoading && <SpinLoader />}
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        {/* Toggle to Sign Up */}
                        <div className="mt-8 text-center">
                            <span className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button 
                                    type="button"
                                    onClick={() => setstate('signup')} 
                                    className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-colors cursor-pointer focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 w-full transition-all duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight">Sign Up</h2>
                            <p className="text-sm text-gray-500 mt-2">Create an account for a faster checkout.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Name Input */}
                            <div>
                                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="signup-password"
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
                                className="w-full mt-4 bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLoading && <SpinLoader />}
                                {isLoading ? "Signing up..." : "Sign Up"}
                            </button>
                        </form>

                        {/* Toggle to Sign In */}
                        <div className="mt-8 text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button 
                                    type="button"
                                    onClick={() => setstate('login')} 
                                    className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-colors cursor-pointer focus:outline-none"
                                >
                                    Sign In
                                </button>
                            </span>
                        </div>
                    </div>
                )}
            </div>
            
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default CheckoutAuth;