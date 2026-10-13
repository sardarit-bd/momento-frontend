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
  Phone,
  Send,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
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

const formatDateInput = (raw) => {
  const digits = String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const isValidDate = (value) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value || "");
  if (!m) return false;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(year, month - 1, day);
  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  );
};

const contactSchema = Yup.object({
  name: Yup.string().trim().required("Please enter your name"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
  phone: Yup.string()
    .trim()
    .test("valid-phone", "Please enter a valid phone number", (value) => {
      if (!value) return true;
      const digits = value.replace(/\D/g, "");
      return (
        /^\+?[0-9\s\-()]+$/.test(value) &&
        digits.length >= 7 &&
        digits.length <= 15
      );
    }),
  inquiryType: Yup.string().required("Please choose an inquiry type"),
  eventDate: Yup.string()
    .trim()
    .test(
      "valid-date",
      "Please enter a valid date (MM/DD/YYYY)",
      (value) => !value || isValidDate(value),
    ),
  message: Yup.string().trim().required("Please enter your message"),
});

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null;

const inputCore =
  "w-full pl-11 pr-4 py-3 rounded-xl bg-white border focus:outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm";
const inputOk =
  "border-slate-200 focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/15";
const inputErr =
  "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    category: "",
    company: "",
    eventDate: "",
    quantity: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const datePickerRef = useRef(null);

  const clearError = (name) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "eventDate" ? formatDateInput(value) : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    clearError(name);
  };

  const handleCategorySelect = (id) => {
    setFormData((prev) => ({ ...prev, category: id }));
  };

  const openDatePicker = () => {
    const el = datePickerRef.current;
    if (!el) return;
    try {
      if (typeof el.showPicker === "function") el.showPicker();
      else el.click();
    } catch {
      el.click();
    }
  };

  const handleDatePick = (e) => {
    const value = e.target.value;
    if (!value) return;
    const [y, m, d] = value.split("-");
    setFormData((prev) => ({ ...prev, eventDate: `${m}/${d}/${y}` }));
    clearError("eventDate");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contactSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (validationError) {
      const next = {};
      (validationError.inner || []).forEach((err) => {
        if (err.path && !next[err.path]) next[err.path] = err.message;
      });
      setErrors(next);
      return;
    }

    try {
      setIsLoading(true);
      const response = await logingandsignupmakepost("api/contact", formData);

      if (response?.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiryType: "",
          category: "",
          company: "",
          eventDate: "",
          quantity: "",
          message: "",
        });
        setErrors({});
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

  const fieldClass = (field) =>
    `${inputCore} ${errors[field] ? inputErr : inputOk}`;
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
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                    className={fieldClass("name")}
                  />
                </div>
                <FieldError message={errors.name} />
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
                    className={fieldClass("email")}
                  />
                </div>
                <FieldError message={errors.email} />
              </div>
            </div>

            <div>
              <label className={labelBase}>
                Phone number{" "}
                <span className="normal-case font-normal text-slate-400">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={20}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className={fieldClass("phone")}
                />
              </div>
              <FieldError message={errors.phone} />
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
                  className={`${fieldClass("inquiryType")} appearance-none pr-10 cursor-pointer ${
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
              <FieldError message={errors.inquiryType} />
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
                  className={fieldClass("company")}
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
                  <button
                    type="button"
                    onClick={openDatePicker}
                    aria-label="Open calendar"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#4F8CFF] transition-colors cursor-pointer z-10"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                  <input
                    ref={datePickerRef}
                    type="date"
                    tabIndex={-1}
                    aria-hidden="true"
                    onChange={handleDatePick}
                    className="absolute left-3.5 top-1/2 w-4 h-4 opacity-0 pointer-events-none"
                  />
                  <input
                    name="eventDate"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.eventDate}
                    onChange={handleChange}
                    placeholder="MM/DD/YYYY"
                    className={fieldClass("eventDate")}
                  />
                </div>
                <FieldError message={errors.eventDate} />
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
                    className={fieldClass("quantity")}
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
                  placeholder="Tell us what you're creating, who it's for, approximate quantity, timing, and anything else we should know."
                  className={`${fieldClass("message")} resize-none min-h-27.5 pt-3.5`}
                />
              </div>
              <FieldError message={errors.message} />
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
