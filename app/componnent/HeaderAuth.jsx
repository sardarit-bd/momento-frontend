'use client'

import useLogedUserStore from "@/store/useLogedUser";
import getEmail from "@/utilis/helper/cookie/getemail";
import getRole from "@/utilis/helper/cookie/getrole";
import getCookie from "@/utilis/helper/cookie/gettooken";
import setCookie from "@/utilis/helper/cookie/setcookie";
import MakePost from "@/utilis/requestrespose/post";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
    const isDeshboard = pathName.startsWith("/deshboard");

    const token = getCookie();
    const role = getRole();
    const name = getEmail();



    useEffect(() => {
        setLoginUser({ name, token, role });
    }, []);


    /*************** handle logout funciton is here ******************/
    const handlelogout = async () => {

        const response = await MakePost('api/auth/logout', {}, token);

        if (response.success) {

            setCookie("token", '', 1);
            setCookie("id", '', 1)
            setCookie("name", '', 1);
            setCookie("role", '', 1);
            // ✅ Immediately clear loginUser state so UI updates
            setLoginUser({ name: null, token: null, role: null });
            router.push('/signin');
            toast.success(response.message);
        } else {
            toast.error("Somethign went Wrong");
        }
    }



    return (
        <div>
            {
                loginUser?.token ? (
                    <div className="flex items-center gap-1 h-full text-gray-500 relative  cursor-pointer">
                        <div className="font-semibold text-md">{loginUser?.name}</div>
                        <div className="group">
                            <MdOutlineAccountCircle className="text-4xl" />
                            <div className="flex flex-col hidden absolute top-[30px] right-6 lg:-right-5 shadow-xl  min-w-[220px] min-h-[120px] group-hover:block">
                                <div className="bg-transparent h-[15px]"> </div>
                                <div className="p-4 bg-white border border-gray-200 rounded-lg tooltipscostom">
                                    <div className="flex flex-col gap-2">

                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <MdOutlineAccountCircle className="text-5xl" />
                                                <div className="flex flex-col gap-0">
                                                    <div className="font-semibold text-sm">{loginUser?.name}</div>
                                                    <span className="text-xs bg-green-100 border border-green-200 rounded-md w-fit h-fit px-1">{loginUser?.role}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Link href={`${loginUser?.role === "Admin" ? "/deshboard/admin" : "/deshboard/customer/orders"}`} className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2">
                                            <MdDashboard className="text-xl" />
                                            <span>Deshboard</span>
                                        </Link>

                                        <Link href={`${loginUser === "Admin" ? "/deshboard/profile" : "/deshboard/profile"}`} className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2">
                                            <LuUser className="text-xl" />
                                            <span>Profile</span>
                                        </Link>

                                        <button onClick={() => { handlelogout() }} className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2 cursor-pointer">
                                            <TbLogout2 className="text-xl" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {
                            !isDeshboard && (

                                isOpen ? (
                                    <ImCross onClick={() => { setisOpen(false) }} className="block lg:hidden text-2xl ml-1 cursor-pointer hover:rotate-180 transition-all duration-300" />
                                ) : (
                                    <FaBars onClick={() => { setisOpen(true) }} className="block lg:hidden text-3xl ml-1 cursor-pointer" />
                                )

                            )
                        }

                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 h-full text-gray-500">
                            <Link href={'/signin'} className="bg-sky-200 px-2 py-1 rounded-md text-gray-600 font-semibold text-md cursor-pointer">Login</Link>
                        </div>
                        {
                            !isDeshboard && (
                                isOpen ? (
                                    <ImCross onClick={() => { setisOpen(false) }} className="block lg:hidden text-2xl ml-1 cursor-pointer hover:rotate-180 transition-all duration-300 text-gray-700" />
                                ) : (
                                    <FaBars onClick={() => { setisOpen(true) }} className="block lg:hidden text-3xl ml-1 cursor-pointer text-gray-700" />
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default HeaderAuth;