"use client";

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

      const response = await logingandsignupmakepost("api/login", {
        email,
        password,
      });

      if (response) {
        setCookie("token", response?.data?.token, 30);
        setCookie("id", response?.data?.user?.id, 30);
        setCookie("name", response?.data?.user?.name, 30);
        setCookie("role", response?.data?.user?.role, 30);
        setLoginUser({
          name: response?.data?.user?.name,
          token: response?.data?.token,
          role: response?.data?.user?.role,
        });

        toast.success(response?.message);
        setLoading(false);

        switch (response?.data?.user?.role?.trim()) {
          case "Admin":
            router.push("/deshboard/admin");
            break;
          case "Customer":
            router.push("/shop");
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
    <div className="w-full min-h-1/2 lg:min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-700">
          Good to See You <span className="text-sky-400">Again!</span>
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
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5 sm:mb-7 tracking-tight">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
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

          {/* Password */}
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

          {/* Login Button */}
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
            Login
          </button>
        </form>

        {/* Bottom links */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center gap-1.5 sm:gap-2">
          <Link
            href="/forgotpass"
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
          >
            Forget Password
          </Link>

          <span className="flex flex-wrap justify-center text-gray-500 items-center gap-1 text-xs sm:text-sm text-center">
            Do not have an account?{" "}
            <Link
              href="signup"
              className="text-sky-400 hover:text-sky-600 hover:underline font-medium transition-colors"
            >
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
