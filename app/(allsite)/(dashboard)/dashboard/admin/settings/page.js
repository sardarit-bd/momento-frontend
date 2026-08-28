"use client";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeGet from "@/utilis/requestrespose/get";
import MakePut from "@/utilis/requestrespose/put";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiEye,
  FiEyeOff,
  FiCreditCard,
  FiLock,
  FiX,
} from "react-icons/fi";

export default function SiteSettings() {
  const id = getId();
  const token = getCookie();
  const { isLoading, setLoading } = useLoadingStore();
  const [fetchloading, setfetchloading] = useState(true);
  const [isedit, setisedit] = useState(false);
  const [key, setkey] = useState("");
  const [secret, setsecret] = useState("");
  const [webhooksecret, setwebhooksecret] = useState("");
  const [credientialsID, setcredientialsID] = useState(null);
  const [showSecret, setShowSecret] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);
  const [focused, setFocused] = useState("");

  const fetching = useCallback(
    async (token) => {
      try {
        const response = await MakeGet(`api/secrets`, token);

        setkey(response?.data?.[0]?.stripe_publishable_key);
        setsecret(response?.data?.[0]?.stripe_secret_key);
        setwebhooksecret(response?.data?.[0]?.stripe_webhook_key);
        setcredientialsID(response?.data?.[0]?.id);

        setfetchloading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setfetchloading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetching(token);
  }, [fetching, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credientialsID) {
      toast.error("Credentials not loaded yet. Please wait and try again.");
      return;
    }

    setLoading(true);

    const passdata = {
      stripe_publishable_key: key,
      stripe_secret_key: secret,
      stripe_webhook_key: webhooksecret,
    };

    const response = await MakePut(
      `api/secrets/${credientialsID}`,
      passdata,
      token,
    );

    if (response?.success) {
      toast.success(response?.message);
      setisedit(false);
      fetching(token);
    } else {
      toast.error("Something went Wrong");
    }

    setLoading(false);
  };

  const inputClass = (field) =>
    `w-full pl-4 pr-11 py-3 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 ${
      !isedit
        ? "bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
        : focused === field
          ? "bg-white border border-sky-400 ring-4 ring-sky-100"
          : "bg-gray-50/70 border border-gray-200 hover:border-gray-300"
    }`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0 shadow-lg shadow-sky-200">
            <FiCreditCard className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              Site Settings
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your Stripe payment credentials
            </p>
          </div>
        </div>

        {!fetchloading &&
          (isedit ? (
            <button
              onClick={() => {
                setisedit(false);
                fetching(token);
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
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] p-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-400 via-sky-500 to-cyan-400"></div>

          <div className="flex items-center gap-2 mb-1 pb-4 border-b border-gray-100">
            <FiLock className="text-sky-500 text-base" />
            <h2 className="text-base font-semibold text-gray-800">
              Stripe Credentials
            </h2>
          </div>
          <p className="text-xs text-gray-400 mb-5 pt-3">
            These keys connect your app to Stripe for processing payments. Keep
            your secret and webhook keys private.
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Publishable Key
              </label>
              <input
                type="text"
                name="stripe-key"
                value={key || ""}
                disabled={!isedit}
                placeholder="pk_live_..."
                onFocus={() => setFocused("key")}
                onBlur={() => setFocused("")}
                onChange={(e) => {
                  setkey(e.target.value);
                }}
                className={inputClass("key")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Secret Key
              </label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  value={secret || ""}
                  name="stripe-secret"
                  disabled={!isedit}
                  placeholder="sk_live_..."
                  onFocus={() => setFocused("secret")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => {
                    setsecret(e.target.value);
                  }}
                  className={inputClass("secret")}
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition-colors"
                  tabIndex={-1}
                >
                  {showSecret ? (
                    <FiEyeOff className="text-base" />
                  ) : (
                    <FiEye className="text-base" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Webhook Secret
              </label>
              <div className="relative">
                <input
                  type={showWebhook ? "text" : "password"}
                  name="stripe-webhook-secret"
                  disabled={!isedit}
                  value={webhooksecret || ""}
                  placeholder="whsec_..."
                  onFocus={() => setFocused("webhook")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => {
                    setwebhooksecret(e.target.value);
                  }}
                  className={inputClass("webhook")}
                />
                <button
                  type="button"
                  onClick={() => setShowWebhook(!showWebhook)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition-colors"
                  tabIndex={-1}
                >
                  {showWebhook ? (
                    <FiEyeOff className="text-base" />
                  ) : (
                    <FiEye className="text-base" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {isedit && (
            <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading || fetchloading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

const ProfileSkleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
      <div className="h-12 bg-gray-100 rounded-xl"></div>
      <div className="h-12 bg-gray-100 rounded-xl"></div>
      <div className="h-12 bg-gray-100 rounded-xl"></div>
      <div className="flex justify-end pt-2">
        <div className="h-11 w-36 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  );
};
