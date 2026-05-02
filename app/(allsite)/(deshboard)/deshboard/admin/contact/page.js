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
    const [active, setactive] = useState(0);



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
    }, [token, setLoading]); // dependencies



    useEffect(() => {
        fetching();

    }, [fetching]);




    /*************  delete function here *****************/
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




    return (
        <div className="px-2 py-1">
            <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
            {loading ? (
                // Skeleton loader
                <Skeletons contacts={contacts} />
            ) : contacts.length === 0 ? (
                <p>No contact messages yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300 border-r-gray-900 border-l-gray-900">
                    <thead>
                        <tr className="bg-sky-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Subject</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c, index) => (
                            <React.Fragment key={index}>
                                {/* Main row */}
                                <tr key={index}
                                    onClick={() => setactive(index)}
                                    className="cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <td className="border p-2">{c.name}</td>
                                    <td className="border p-2">{c.email}</td>
                                    <td className="border p-2">{c.sub}</td>
                                    <td className="border p-2 text-center ">
                                        <span onClick={() => { deleteContact(c?.id) }} className="bg-red-300 px-2 py-1 rounded cursor-pointer">
                                            Delete
                                        </span>
                                    </td>
                                </tr>

                                {/* Message row */}
                                {active === index && (
                                    <tr className="bg-gray-100">
                                        <td colSpan={4} className="p-2 text-gray-500">
                                            {c.mes}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}




















const Skeletons = () => {
    return (
        <div className="animate-pulse">


            <div className="h-8 bg-gray-200 rounded mb-2 w-2/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-2/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-2/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-2/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-1/4"></div>




        </div>
    )
}