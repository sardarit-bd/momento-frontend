'use client'

import { useRouter } from "next/navigation";
import useLoadingStore from "../../../../store/useLoadingStore";
import logingandsignupmakepost from "../../../../utilis/requestrespose/logingandsignupmakepost";

import useLogedUserStore from "@/store/useLogedUser";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ForgotPas = () => {

    const router = useRouter();
    const { isLoading, setLoading } = useLoadingStore();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const [stage, setstage] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setotp] = useState('');
    const [password, setPassword] = useState("");
    const [conpass, setconpass] = useState('');

    /******** handle OTP send function is here *******/
    async function OTPsend(e) {
        e.preventDefault();

        if (email) {
            setLoading(true);
            const response = await logingandsignupmakepost("api/forgotpass", { email });

            setLoading(false);

            if (response) {
                setstage(1);
                toast.success(response?.message);
            } else {
                toast.error("Something Went Wrong");
            }
        } else {
            toast.warn("Email is Required");
        }
    }

    /******** handle verify  OTP  function is here *******/
    async function verifyOTP(e) {
        e.preventDefault();

        console.log(otp);

        if (otp) {
            setLoading(true);
            const response = await logingandsignupmakepost("api/verify", { email, otp });

            setLoading(false);

            if (response) {
                setstage(2);
                toast.success(response?.message);
            } else {
                toast.error("OTP Verify Failed");
            }
        } else {
            toast.warn("OTP is Required");
        }
    }

    /******** handle verify  OTP  function is here *******/
    async function passwordChange(e) {
        e.preventDefault();

        if (password && conpass) {
            if (password === conpass) {
                setLoading(true);

                const passdata = {
                    email,
                    password
                }

                console.log(passdata);

                const response = await logingandsignupmakepost("api/resetpass", passdata);

                setLoading(false);

                if (response) {
                    toast.success(response?.message);

                    setTimeout(() => {
                        router.push('/signin');
                    }, 1500);
                } else {
                    toast.error("Password Update Failed");
                }

            } else {
                toast.warn("Password and confirm Password Does not Match");
            }
        } else {
            toast.warn("Password and confirm Password is required");
        }
    }

    /********** getway function is here ***********/
    const getway = (stage, e) => {
        switch (stage) {
            case 0:
                OTPsend(e);
                break;
            case 1:
                verifyOTP(e);
                break;
            default:
                passwordChange(e);
                break;
        }
    }

    return (
        <div className="my-5 lg:my-10 flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight">Password Reset</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        {stage === 0 && "Enter your email to receive a verification code."}
                        {stage === 1 && "Enter the verification code sent to your email."}
                        {stage === 2 && "Create a new, secure password for your account."}
                    </p>
                </div>

                <form className="space-y-5">
                    
                    {/* Stage 0: Email Input */}
                    {stage === 0 && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                    )}

                    {/* Stage 1: OTP Input */}
                    {stage === 1 && (
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                Verification Code (OTP)
                            </label>
                            <input
                                id="otp"
                                type="number"
                                placeholder="Enter code"
                                onChange={(e) => setotp(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                    )}

                    {/* Stage 2: New Password Inputs */}
                    {stage === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    id="new-password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={conpass}
                                    onChange={(e) => setconpass(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                        </div>
                    )}

                    {/* Dynamic Submit Button */}
                    <button 
                        onClick={(e) => { getway(stage, e) }} 
                        disabled={isLoading} 
                        className="w-full mt-4 bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isLoading && (
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        )}
                        
                        {isLoading ? "Processing..." : stage === 0 ? "Send OTP" : stage === 1 ? "Verify Code" : "Change Password"}
                    </button>
                    
                    {/* Optional: Back to Login link could go here if user wants to cancel */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => router.push('/signin')}
                            className="text-sm font-medium text-gray-500 hover:text-sky-500 transition-colors"
                        >
                            Back to Sign In
                        </button>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPas;