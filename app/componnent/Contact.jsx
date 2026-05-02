"use client";

import logingandsignupmakepost from "@/utilis/requestrespose/logingandsignupmakepost";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SpinLoader from "./SpingLoader";

export default function ContactForm() {




    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [sub, setsub] = useState('');
    const [mes, setmes] = useState('');
    const [isloading, setisloading] = useState(false);



    /****************** handle submit function here ******************/
    const handleSubmit = async (e) => {

        e.preventDefault();


        if (name && email && mes) {

            setisloading(true);


            const response = await logingandsignupmakepost('api/contact', { name, email, sub, mes });

            setisloading(false);

            if (response?.success) {

                setname('');
                setemail('');
                setsub('');
                setmes('');
                toast.success(response?.message);

            } else {
                toast.error("Something went Wrong. Try again Later");
            }
        } else {
            toast.warn("Please Fill Up All Required Fileds");
        }


    }






    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
            {/* Title */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-gray-700">
                    WE'VE GOT YOU <span className="text-sky-400">COVERED!</span>
                </h1>
                <p className="mt-5 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
                    Have questions? Need help with an order? Want to create something truly special?
                    We’re here to make your experience effortless and exciting.
                </p>
            </div>

            {/* Form Container */}
            <div className="bg-blue-50 rounded-xl shadow-md w-full max-w-xl p-6 sm:p-8 border border-gray-100">
                <form className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={name}
                            onChange={(e) => { setname(e.target.value) }}
                            type="text"
                            placeholder="Name"
                            className="w-full p-3 rounded-md bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-gray-700"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-md bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-gray-700"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Subject
                        </label>
                        <input
                            value={sub}
                            onChange={(e) => { setsub(e.target.value) }}
                            type="text"
                            placeholder="Subject"
                            className="w-full p-3 rounded-md bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-gray-700"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={mes}
                            onChange={(e) => { setmes(e.target.value) }}
                            placeholder="Message"
                            rows="4"
                            className="w-full p-3 rounded-md bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-gray-700 resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button disabled={isloading}
                        onClick={(e) => { handleSubmit(e) }}
                        className="w-full bg-sky-400 hover:bg-sky-600 text-white py-3 rounded-md font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-2 justify-center"
                    >
                        {
                            isloading && <SpinLoader />
                        }


                        SEND
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
