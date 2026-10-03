"use client";

import logingandsignupmakepost from "@/utilis/requestrespose/logingandsignupmakepost";
import {
  Building2,
  Calendar,
  ChevronDown,
  Handshake,
  Heart,
  HelpCircle,
  Mail,
  MessageSquare,
  Package,
  Pencil,
  Send,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SpinLoader from "./SpingLoader";

const INQUIRY_CATEGORIES = [
  { id: "general", label: "Order Help / General Question", icon: HelpCircle },
  { id: "bulk", label: "Bulk & Group Orders", icon: Package },
  { id: "events", label: "Events & Concierge", icon: Calendar },
  { id: "corporate", label: "Corporate & Brand Projects", icon: Building2 },
  {
    id: "partnership",
    label: "Creator / Partnership Inquiry",
    icon: Handshake,
  },
  { id: "custom", label: "Custom Request", icon: Pencil },
];

const SERVICE_NAV = [
  { label: "Bulk & Group Orders", icon: Package },
  { label: "Events & Concierge", icon: Calendar },
  { label: "Corporate & Brand Projects", icon: Building2 },
  { label: "Partnerships & Collaborations", icon: Handshake },
];

const NAVY = "#0B1B33";
const BLUE = "#4F8CFF";
const BLUE_LIGHT = "#5B9DFF";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    category: "",
    company: "",
    eventDate: "",
    quantity: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (id) => {
    setFormData((prev) => ({ ...prev, category: id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.warn("Please fill up all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await logingandsignupmakepost("api/contact", formData);

      if (response?.success) {
        setFormData({
          name: "",
          email: "",
          inquiryType: "",
          category: "",
          company: "",
          eventDate: "",
          quantity: "",
          message: "",
        });
        toast.success(response?.message || "Inquiry sent successfully!");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/15 focus:outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm";
  const labelBase =
    "block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #F7F9FC 0%, #F0F6FF 45%, #E8F2FF 100%)",
      }}
    >
      <div
        className="absolute top-[-10%] left-[-8%] w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
        style={{
          background: "rgba(79, 140, 255, 0.14)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-8%] w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
        style={{
          background: "rgba(79, 140, 255, 0.14)",
          filter: "blur(110px)",
        }}
      />

      <div
        className="w-full max-w-6xl grid md:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.3fr)] rounded-4xl overflow-hidden relative z-10 bg-white"
        style={{ boxShadow: "0 30px 80px rgba(15, 35, 65, 0.18)" }}
      >
        <div
          className="flex flex-col justify-between gap-8 p-8 sm:p-10"
          style={{ background: NAVY }}
        >
          <div>
            <span
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: BLUE_LIGHT }}
            >
              Get in touch
            </span>

            <h1 className="mt-4 font-bold text-white leading-[1.1] text-[clamp(1.9rem,3.6vw,2.75rem)]">
              We&rsquo;ve got
              <br />
              you covered.{" "}
              <Heart
                className="inline-block w-6 h-6 sm:w-7 sm:h-7 align-middle"
                style={{ color: BLUE_LIGHT }}
              />
            </h1>

            <div
              className="w-10 h-0.75 rounded-full my-5"
              style={{ background: BLUE_LIGHT }}
            />

            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Questions, ideas, or planning something special? Let us know how
              we can help.
            </p>

            <div
              className="mt-7 rounded-2xl p-4 sm:p-5 flex items-start gap-4"
              style={{
                border: "1px solid rgba(91, 157, 255, 0.35)",
                background: "rgba(91, 157, 255, 0.05)",
              }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(91, 157, 255, 0.12)",
                  border: "1px solid rgba(91, 157, 255, 0.35)",
                }}
              >
                <Handshake className="w-5 h-5" style={{ color: BLUE_LIGHT }} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Need something bigger?
                </p>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-1">
                  From events and bulk orders to corporate projects and custom
                  collaborations —{" "}
                  <span style={{ color: BLUE_LIGHT }}>
                    we&rsquo;re here for it.
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-6">
              {SERVICE_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <Icon className="w-5 h-5 text-white/80" />
                    <span className="text-[11px] leading-tight text-white/70">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p
              className="text-white text-2xl italic"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Momento
            </p>
            <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mt-1">
              Personalized cards
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase}>
                  Name <span style={{ color: BLUE }}>*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className={inputBase}
                  />
                </div>
              </div>
              <div>
                <label className={labelBase}>
                  Email address <span style={{ color: BLUE }}>*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputBase}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelBase}>
                What can we help with? <span style={{ color: BLUE }}>*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`${inputBase} appearance-none pr-10 cursor-pointer ${
                    formData.inquiryType === "" ? "text-slate-400" : ""
                  }`}
                >
                  <option value="" disabled>
                    Choose an inquiry type
                  </option>
                  {INQUIRY_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INQUIRY_CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = formData.category === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => handleCategorySelect(c.id)}
                    className="flex flex-col items-start gap-2 rounded-xl p-3 text-left transition-all duration-150"
                    style={{
                      border: active
                        ? `1.5px solid ${BLUE}`
                        : "1px solid #E2E8F0",
                      background: active
                        ? "rgba(79, 140, 255, 0.06)"
                        : "#FFFFFF",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: active ? BLUE : "#64748B" }}
                    />
                    <span className="text-xs font-medium leading-snug text-slate-700">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className={labelBase}>
                Company / organization{" "}
                <span className="normal-case font-normal text-slate-400">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company or organization"
                  className={inputBase}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase}>
                  Event date{" "}
                  <span className="normal-case font-normal text-slate-400">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="eventDate"
                    type="text"
                    value={formData.eventDate}
                    onChange={handleChange}
                    placeholder="MM/DD/YYYY"
                    className={inputBase}
                  />
                </div>
              </div>
              <div>
                <label className={labelBase}>
                  Estimated quantity{" "}
                  <span className="normal-case font-normal text-slate-400">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 25–50, 50–100, 100+"
                    className={inputBase}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelBase}>
                Tell us about your idea <span style={{ color: BLUE }}>*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what you're creating, who it's for, approximate quantity, timing, and anything else we should know."
                  className={`${inputBase} resize-none min-h-27.5 pt-3.5`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              style={{ background: NAVY }}
            >
              {isLoading ? <SpinLoader /> : <Send className="w-4 h-4" />}
              {isLoading ? "Sending..." : "Send inquiry"}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              We typically respond within 1 business day.
            </p>
          </form>
        </div>
      </div>
      <ToastContainer theme="light" position="bottom-right" />
    </div>
  );
}
