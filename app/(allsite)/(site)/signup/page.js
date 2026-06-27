'use client'

import SpinLoader from "@/app/componnent/SpingLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useLoadingStore from "../../../../store/useLoadingStore";
import logingandsignupmakepost from "../../../../utilis/requestrespose/logingandsignupmakepost";


const SignUP = () => {

    const router = useRouter();
    const { isLoading, setLoading } = useLoadingStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setres] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name && email && password) {
            setLoading(true);
            const response = await logingandsignupmakepost("api/register", { name, email, password });

            if (response) {
                setres(response);
                setLoading(false);
                router.push('/signin');
            } else {
                setLoading(false);
                toast.warn("User Already Exist");
                return;
            }
        } else {
            toast.warn("Required All Feilds");
        }
    };

    return (
        <div className="my-5 lg:my-10 flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight">Create an Account</h2>
                    <p className="text-sm text-gray-500 mt-2">Join us today! Please enter your details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                        />
                    </div>

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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
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
                        className="w-full mt-4 bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isLoading && <SpinLoader />}
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <span className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="signin" className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-colors">
                            Sign In
                        </Link>
                    </span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUP;