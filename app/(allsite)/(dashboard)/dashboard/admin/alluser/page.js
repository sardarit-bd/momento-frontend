"use client";

import Alluserskalaton from "@/app/componnent/skelaton/Alluserskalaton";
import getCookie from "@/utilis/helper/cookie/gettooken";
import getId from "@/utilis/helper/cookie/getid";
import getDateFromTimestamp from "@/utilis/helper/getDateFromTimestamp";
import MakeGet from "@/utilis/requestrespose/get";
import MakePut from "@/utilis/requestrespose/put";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllUser = () => {
  const [loading, setloading] = useState(false);
  const [AllUser, setAlluser] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingRole, setEditingRole] = useState("");
  const token = getCookie();
  const currentAdminId = getId();

  const fetchingUser = useCallback(async () => {
    setloading(true);
    const res = await MakeGet(`api/users`, token);
    setloading(false);
    if (res?.success) {
      setAlluser(res?.data);
    } else {
      toast.error("Something went Wrong");
    }
  }, [token]);

  useEffect(() => {
    fetchingUser();
  }, [fetchingUser]);

  const handleRoleClick = (userId, currentRole) => {
    if (userId === currentAdminId) return;
    setEditingUserId(userId);
    setEditingRole(currentRole);
  };

  const handleRoleChange = async (userId, newRole) => {
    const oldRole = editingRole;
    const response = await MakePut(
      `api/users/${userId}/role`,
      { role: newRole },
      token,
    );
    if (response?.success) {
      toast.success(`User role changed from ${oldRole} to ${newRole}`);
      setEditingUserId(null);
      setEditingRole("");
      fetchingUser();
    } else {
      const errorMessage = response?.message || "Something went Wrong";

      if (response?.status === 403) {
        toast.warn(errorMessage);
      } else if (response?.status === 422) {
        toast.warn(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }
  };
  if (loading) return <Alluserskalaton />;
  return (
    <div>
      <div className="">
        <div className="overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="py-3 px-6 text-left">SL</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Joined</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {AllUser?.length > 0 ? (
                  AllUser?.map((item, index) => {
                    const isEditing = editingUserId === item?.id;
                    const isSelf = item?.id === currentAdminId;
                    const currentRole = item?.role || item?.type || "";
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6 font-medium">
                          {item?.name ? item?.name : "-"}
                        </td>
                        <td className="py-3 px-6">
                          {isEditing ? (
                            <select
                              value={editingRole}
                              onChange={(e) =>
                                handleRoleChange(item?.id, e.target.value)
                              }
                              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              autoFocus
                            >
                              <option value="Customer">Customer</option>
                              <option value="Admin">Admin</option>
                            </select>
                          ) : (
                            <span
                              onClick={() =>
                                handleRoleClick(item?.id, currentRole)
                              }
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                                currentRole === "Admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-700"
                              } ${isSelf ? "cursor-default opacity-70" : "hover:ring-1 hover:ring-blue-400"}`}
                            >
                              {currentRole}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6">{item?.email}</td>
                        <td className="py-3 px-6">
                          {getDateFromTimestamp(item?.created_at)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-left py-6">
                    <td className="py-6">No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
