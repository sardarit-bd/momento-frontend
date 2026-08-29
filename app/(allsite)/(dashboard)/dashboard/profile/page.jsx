"use client";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeGet from "@/utilis/requestrespose/get";
import MakePut from "@/utilis/requestrespose/put";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEdit2, FiX, FiUser, FiMail, FiLock } from "react-icons/fi";

export default function ProfilePage() {
  const id = getId();
  const token = getCookie();
  const { isLoading, setLoading } = useLoadingStore();
  const [fetchloading, setfetchloading] = useState(true);
  const [isedit, setisedit] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [focused, setFocused] = useState("");

  const fetching = useCallback(
    async (id, token) => {
      try {
        const response = await MakeGet(`api/profile/${id}`, token);

        setname(response?.data?.user?.name);
        setemail(response?.data?.user?.email);
        setphone(response?.data?.user?.phone);
        setaddress(response?.data?.user?.address);

        setfetchloading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setfetchloading(false);
      }
    },
    [id, token],
  );

  useEffect(() => {
    fetching(id, token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const passdata = {
      name,
      email,
      phone,
      address,
    };

    const response = await MakePut(`api/profile/${id}`, passdata, token);

    if (response?.success) {
      toast.success(response?.message);
      setisedit(false);
      fetching(id, token);
    } else {
      toast.error("Something went Wrong");
    }

    setLoading(false);
  };

  const inputClass = (field, locked = false) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 ${
      locked
        ? "bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
        : !isedit
          ? "bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
          : focused === field
            ? "bg-white border border-sky-400 ring-4 ring-sky-100 text-gray-800"
            : "bg-gray-50/70 border border-gray-200 hover:border-gray-300 text-gray-800"
    }`;

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("")
    : "?";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0 shadow-lg shadow-sky-200">
            <FiUser className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              Profile Information
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your personal account details
            </p>
          </div>
        </div>

        {!fetchloading &&
          (isedit ? (
            <button
              onClick={() => {
                setisedit(false);
                fetching(id, token);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-[0.97] transition-all duration-200"
            >
              <FiX className="text-sm" />
              Cancel
            </button>
          ) : (
            <button
              onClick={() => {
                setisedit(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-sky-200"
            >
              <FiEdit2 className="text-sm" />
              Edit
            </button>
          ))}
      </div>

      {fetchloading ? (
        <ProfileSkleton />
      ) : (
        <div className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] p-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-400 via-sky-500 to-cyan-400"></div>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-sky-100 to-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-sky-600">{initials}</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {name || "Unnamed User"}
              </h2>
              <p className="text-sm text-gray-500 truncate">{email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  disabled={!isedit}
                  placeholder="Your full name"
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  className={inputClass("name")}
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Email Address
                  <span className="inline-flex items-center gap-1 normal-case font-medium text-gray-400 text-[11px] bg-gray-100 px-1.5 py-0.5 rounded-md ml-1">
                    <FiLock className="text-[10px]" />
                    Locked
                  </span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    disabled={true}
                    value={email || ""}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className={`${inputClass("email", true)} pl-10`}
                  />
                </div>
              </div>
              <div className="hidden">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  disabled={!isedit}
                  value={phone && phone != null ? phone : ""}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                  className={inputClass("phone")}
                />
              </div>

              <div className="hidden">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={address && address != null ? address : ""}
                  disabled={!isedit}
                  onFocus={() => setFocused("address")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  rows="6"
                  className={inputClass("address")}
                ></textarea>
              </div>
            </div>

            {isedit && (
              <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300"
                >
                  {isLoading && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  {isLoading ? "Saving..." : "Update Profile"}
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

const ProfileSkleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 animate-pulse">
      <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
        <div className="w-16 h-16 rounded-2xl bg-gray-100"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-32"></div>
          <div className="h-3 bg-gray-100 rounded w-44"></div>
        </div>
      </div>
      <div className="h-12 bg-gray-100 rounded-xl"></div>
      <div className="h-12 bg-gray-100 rounded-xl"></div>
      <div className="flex justify-end pt-2">
        <div className="h-11 w-36 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  );
};
