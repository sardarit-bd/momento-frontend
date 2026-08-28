"use client";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeDelete from "@/utilis/requestrespose/delete";
import MakeGet from "@/utilis/requestrespose/get";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminContactPage() {
  const token = getCookie();
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setactive] = useState(null);

  const fetching = useCallback(async () => {
    try {
      const response = await MakeGet("api/contacts", token);
      if (response?.data?.contacts) {
        setContacts(response.data.contacts);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  async function deleteContact(id) {
    setLoading(true);
    const response = await MakeDelete(`api/contacts/${id}`, token);
    setLoading(false);
    if (response?.success) {
      toast.success(response?.message);
      fetching();
    } else {
      toast.error("Something Went Wrong");
    }
  }

  if (loading) return <Skeletons />;

  return (
    <div className="px-3 py-4">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Contact Submissions
      </h1>

      {contacts?.length === 0 ? (
        <p className="text-gray-500 text-sm">No contact messages yet.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-sky-200">
                  <th className="border p-2 text-left text-sm">Name</th>
                  <th className="border p-2 text-left text-sm">Email</th>
                  <th className="border p-2 text-left text-sm">Subject</th>
                  <th className="border p-2 text-center text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, index) => (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => setactive(active === index ? null : index)}
                      className="cursor-pointer hover:bg-gray-50 transition"
                    >
                      <td className="border p-2 text-sm">{c.name}</td>
                      <td className="border p-2 text-sm">{c.email}</td>
                      <td className="border p-2 text-sm">{c.sub}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteContact(c?.id);
                          }}
                          className="bg-red-300 hover:bg-red-400 text-sm px-3 py-1 rounded cursor-pointer transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {active === index && (
                      <tr className="bg-gray-50">
                        <td
                          colSpan={4}
                          className="p-3 text-gray-600 text-sm border-b"
                        >
                          <span className="font-semibold text-gray-700">
                            Message:{" "}
                          </span>
                          {c.mes}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {contacts.map((c, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => setactive(active === index ? null : index)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {c.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {c.email}
                      </p>
                      <span className="inline-block mt-2 text-xs bg-sky-100 text-sky-700 font-medium px-2 py-0.5 rounded-full">
                        {c.sub}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteContact(c?.id);
                      }}
                      className="shrink-0 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {active === index && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Message
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {c.mes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const Skeletons = () => (
  <div className="animate-pulse px-3 py-4 space-y-3">
    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="bg-white border border-gray-100 rounded-xl p-4 space-y-2"
      >
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    ))}
  </div>
);
