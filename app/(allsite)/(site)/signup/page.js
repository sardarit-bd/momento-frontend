"use client";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setres] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      setLoading(true);
      const response = await logingandsignupmakepost("api/register", {
        name,
        email,
        password,
      });

      console.log(response);

      if (response) {
        setres(response);
        setLoading(false);
        router.push("/signin");
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
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700">
          Create Your <span className="text-sky-400">Account!</span>
        </h1>
      </div>

      <div
        className="
                bg-blue-50 border border-blue-100
                rounded-2xl shadow-lg
                w-full
                max-w-sm sm:max-w-md lg:max-w-lg
                p-6 sm:p-8 lg:p-10
            "
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5 sm:mb-7 tracking-tight">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-gray-600 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                                w-full rounded-lg bg-white border border-gray-200
                                px-3 py-2.5 sm:px-4 sm:py-3
                                text-sm text-gray-600 placeholder-gray-400
                                focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none
                                transition-all
                            "
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                                w-full rounded-lg bg-white border border-gray-200
                                px-3 py-2.5 sm:px-4 sm:py-3
                                text-sm text-gray-600 placeholder-gray-400
                                focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none
                                transition-all
                            "
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                                w-full rounded-lg bg-white border border-gray-200
                                px-3 py-2.5 sm:px-4 sm:py-3
                                text-sm text-gray-600 placeholder-gray-400
                                focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none
                                transition-all
                            "
            />
          </div>

          <button
            disabled={isLoading}
            className="
                            w-full rounded-lg
                            bg-sky-400 hover:bg-sky-500 active:bg-sky-600
                            disabled:opacity-60 disabled:cursor-not-allowed
                            text-white font-semibold text-sm tracking-wide
                            py-2.5 sm:py-3
                            shadow-sm transition-all duration-200
                            flex items-center gap-2 justify-center cursor-pointer
                        "
          >
            {isLoading && <SpinLoader />}
            Sign Up
          </button>
        </form>

        <div className="mt-5 sm:mt-6 flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="flex flex-wrap justify-center text-gray-500 items-center gap-1 text-xs sm:text-sm text-center">
            Already have an account?{" "}
            <Link
              href="signin"
              className="text-sky-400 hover:text-sky-600 hover:underline font-medium transition-colors"
            >
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
