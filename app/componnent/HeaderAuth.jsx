'use client'

import useLogedUserStore from "@/store/useLogedUser";
import getEmail from "@/utilis/helper/cookie/getemail";
import getRole from "@/utilis/helper/cookie/getrole";
import getCookie from "@/utilis/helper/cookie/gettooken";
import setCookie from "@/utilis/helper/cookie/setcookie";
import MakePost from "@/utilis/requestrespose/post";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { LuUser } from "react-icons/lu";
import { MdDashboard, MdOutlineAccountCircle } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";

const HeaderAuth = ({ isOpen, setisOpen }) => {

    const router = useRouter();
    const pathName = usePathname();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const isDashboard = pathName.startsWith("/dashboard");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const token = getCookie();
    const role = getRole();
    const name = getEmail();

    useEffect(() => {
        setLoginUser({ name, token, role });
    }, []);

    // Close dropdown when clicking/touching outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.user-dropdown')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handlelogout = async () => {
        const response = await MakePost('api/auth/logout', {}, token);
        if (response.success) {
            setCookie("token", '', 0);
            setCookie("id",    '', 0);
            setCookie("name",  '', 0);
            setCookie("role",  '', 0);
            setLoginUser({ name: null, token: null, role: null });
            setDropdownOpen(false);
            router.push('/signin');
            toast.success(response.message);
        } else {
            toast.error("Something went Wrong");
        }
    }

    return (
        <div>
            {loginUser?.token ? (
                <div className="flex items-center gap-1 h-full text-gray-500 relative cursor-pointer">
                    <div className="font-semibold text-md">{loginUser?.name}</div>

                    {/* User icon + dropdown */}
                    <div className="group user-dropdown relative">
                        <MdOutlineAccountCircle
                            className="text-4xl"
                            onClick={() => setDropdownOpen(prev => !prev)}
                        />

                        {/* Dropdown — hover on desktop, tap-toggle on mobile */}
                        <div
                            className={`
                                flex flex-col absolute top-[38px] right-0 shadow-xl
                                min-w-[220px] z-50
                                ${dropdownOpen ? 'flex' : 'hidden'}
                                lg:hidden lg:group-hover:flex
                            `}
                        >
                            <div className="bg-transparent h-[8px]" />
                            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                <div className="flex flex-col gap-2">

                                    {/* User info */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <MdOutlineAccountCircle className="text-5xl" />
                                        <div className="flex flex-col gap-0">
                                            <div className="font-semibold text-sm">{loginUser?.name}</div>
                                            <span className="text-xs bg-green-100 border border-green-200 rounded-md w-fit h-fit px-1">
                                                {loginUser?.role}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dashboard */}
                                    <Link
                                        href={loginUser?.role === "Admin" ? "/dashboard/admin" : "/dashboard/customer/orders"}
                                        className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <MdDashboard className="text-xl" />
                                        <span>Dashboard</span>
                                    </Link>

                                    {/* Profile */}
                                    <Link
                                        href="/dashboard/profile"
                                        className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <LuUser className="text-xl" />
                                        <span>Profile</span>
                                    </Link>

                                    {/* Logout */}
                                    <button
                                        onClick={handlelogout}
                                        className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2 cursor-pointer"
                                    >
                                        <TbLogout2 className="text-xl" />
                                        <span>Logout</span>
                                    </button>

                                </div>
                            </div>
                        </div>

                        {/* Desktop-only hover dropdown (lg and above) */}
                        <div className="hidden lg:flex flex-col absolute top-[38px] right-0 shadow-xl min-w-[220px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                            <div className="bg-transparent h-[8px]" />
                            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                <div className="flex flex-col gap-2">

                                    {/* User info */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <MdOutlineAccountCircle className="text-5xl" />
                                        <div className="flex flex-col gap-0">
                                            <div className="font-semibold text-sm">{loginUser?.name}</div>
                                            <span className="text-xs bg-green-100 border border-green-200 rounded-md w-fit h-fit px-1">
                                                {loginUser?.role}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dashboard */}
                                    <Link
                                        href={loginUser?.role === "Admin" ? "/dashboard/admin" : "/dashboard/customer/orders"}
                                        className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2"
                                    >
                                        <MdDashboard className="text-xl" />
                                        <span>Dashboard</span>
                                    </Link>

                                    {/* Profile */}
                                    <Link
                                        href="/dashboard/profile"
                                        className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2"
                                    >
                                        <LuUser className="text-xl" />
                                        <span>Profile</span>
                                    </Link>

                                    {/* Logout */}
                                    <button
                                        onClick={handlelogout}
                                        className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2 cursor-pointer"
                                    >
                                        <TbLogout2 className="text-xl" />
                                        <span>Logout</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hamburger — only outside dashboard */}
                    {!isDashboard && (
                        isOpen ? (
                            <ImCross
                                onClick={() => setisOpen(false)}
                                className="block lg:hidden text-2xl ml-1 cursor-pointer hover:rotate-180 transition-all duration-300"
                            />
                        ) : (
                            <FaBars
                                onClick={() => setisOpen(true)}
                                className="block lg:hidden text-3xl ml-1 cursor-pointer"
                            />
                        )
                    )}
                </div>

            ) : (
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 h-full text-gray-500">
                        <Link
                            href="/signin"
                            className="bg-sky-200 px-2 py-1 rounded-md text-gray-600 font-semibold text-md cursor-pointer"
                        >
                            Login
                        </Link>
                    </div>
                    {!isDashboard && (
                        isOpen ? (
                            <ImCross
                                onClick={() => setisOpen(false)}
                                className="block lg:hidden text-2xl ml-1 cursor-pointer hover:rotate-180 transition-all duration-300 text-gray-700"
                            />
                        ) : (
                            <FaBars
                                onClick={() => setisOpen(true)}
                                className="block lg:hidden text-3xl ml-1 cursor-pointer text-gray-700"
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default HeaderAuth;