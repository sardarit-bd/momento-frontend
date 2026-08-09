"use client";

import logingandsignupmakepost from "@/utilis/requestrespose/logingandsignupmakepost";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SpinLoader from "./SpingLoader";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Removed TypeScript types here
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /****************** Handle Submit Function ******************/
  // Removed TypeScript types here
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !message) {
      toast.warn("Please fill up all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await logingandsignupmakepost("api/contact", {
        name,
        email,
        sub: subject, // Maps cleanly to your existing API signature
        mes: message,
      });

      if (response?.success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success(response?.message || "Message sent successfully!");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #F3F4F6 0%, #EBF6FF 45%, #D9EEFD 100%)" }}
    >
      {/* Ambient brand-blue glows, matching the hero background treatment */}
      <div
        className="absolute top-[-12%] left-[-10%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(60, 169, 255, 0.16)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-[-12%] right-[-10%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(106, 192, 255, 0.18)", filter: "blur(120px)" }}
      />

      <div
        className="w-full max-w-4xl grid md:grid-cols-5 gap-0 bg-white rounded-3xl overflow-hidden relative z-10"
        style={{
          border: "1px solid #D9EEFD",
          boxShadow: "0 30px 70px rgba(60, 169, 255, 0.18)",
        }}
      >
        {/* Left Informational Sidebar */}
        <div
          className="md:col-span-2 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r"
          style={{
            background: "linear-gradient(160deg, #3CA9FF 0%, #6AC0FF 100%)",
            borderColor: "#D9EEFD",
          }}
        >
          <div>
            <span className="text-xs font-bold tracking-widest text-white/80 uppercase">
              Get In Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight tracking-tight">
              We've got you <br />
              <span className="text-[#0B2A4A]">covered.</span>
            </h1>
            <p className="mt-4 text-white/90 text-sm leading-relaxed">
              Have questions? Need help with an order? Want to create something truly
              special? We&rsquo;re here to make your experience effortless.
            </p>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="md:col-span-3 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-slate-500 text-xs font-semibold uppercase tracking-wider"
              >
                Name <span className="text-[#3CA9FF]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F3F4F6] border border-[#D9EEFD] focus:border-[#3CA9FF] focus:ring-2 focus:ring-[#3CA9FF]/20 focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-slate-500 text-xs font-semibold uppercase tracking-wider"
              >
                Email Address <span className="text-[#3CA9FF]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F3F4F6] border border-[#D9EEFD] focus:border-[#3CA9FF] focus:ring-2 focus:ring-[#3CA9FF]/20 focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 text-sm"
              />
            </div>

            {/* Subject Input */}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="block text-slate-500 text-xs font-semibold uppercase tracking-wider"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can we help?"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F3F4F6] border border-[#D9EEFD] focus:border-[#3CA9FF] focus:ring-2 focus:ring-[#3CA9FF]/20 focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 text-sm"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-slate-500 text-xs font-semibold uppercase tracking-wider"
              >
                Message <span className="text-[#3CA9FF]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#F3F4F6] border border-[#D9EEFD] focus:border-[#3CA9FF] focus:ring-2 focus:ring-[#3CA9FF]/20 focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 text-sm resize-none min-h-[120px]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-3 justify-center cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #3CA9FF 0%, #6AC0FF 100%)",
                boxShadow: "0 14px 30px rgba(60, 169, 255, 0.35)",
              }}
            >
              {isLoading && <SpinLoader />}
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer theme="light" position="bottom-right" />
    </div>
  );
}