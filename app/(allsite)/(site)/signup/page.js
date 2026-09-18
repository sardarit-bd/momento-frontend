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

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      setLoading(true);
      const response = await logingandsignupmakepost("api/register", {
        name,
        email,
        password,
      });

      if (response) {
        setres(response);
        setLoading(false);
        setShowSuccessModal(true);
      } else {
        setLoading(false);
        toast.warn("User Already Exist");
        return;
      }
    } else {
      toast.warn("Required All Feilds");
    }
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    router.push("/signin");
  };

  return (
    <div className="my-5 lg:my-10 flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Join us today! Please enter your details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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

          <button
            disabled={isLoading}
            className="w-full mt-4 bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading && <SpinLoader />}
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </span>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-sm text-center animate-in fade-in zoom-in duration-200">

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
              Sign Up Complete!
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Your account has been successfully created. You can now sign in to access your account.
            </p>
            <button
              onClick={handleModalConfirm}
              className="w-full bg-sky-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SignUP;