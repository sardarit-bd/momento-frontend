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
        <div className="w-screen h-[60vh] flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-xl text-black font-bold mb-4">Password Reset</h2>

                <form className="space-y-4 text-gray-600">

                    {stage == 0 ? (
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                        />
                    ) : stage == 1 ? (
                        <input
                            type="number"
                            placeholder="OTP"
                            onChange={(e) => setotp(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                        />
                    ) : (
                        <div>
                            <input
                                type="email"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                            />

                            <input
                                type="email"
                                placeholder="Comfirm Passwrod"
                                value={conpass}
                                onChange={(e) => setconpass(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mt-3"
                            />
                        </div>
                    )}





                    <button onClick={(e) => { getway(stage, e) }} disabled={isLoading} className="w-full bg-sky-400 text-white font-semibold py-2 rounded-md focus:outline-none hover:bg-sky-600 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        {
                            isLoading && <div className="w-[20px] h-[20px] rounded-full border-b-3 border-l-3 bordergray-50 animate-spin">
                            </div>
                        }

                        {stage == 0 ? "Send OTP" : stage == 1 ? "Verrify" : "Change Password"}

                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPas;
