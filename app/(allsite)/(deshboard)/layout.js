'use client'

import usedeshboardsidebercontroller from "@/store/deshboardsidebercontroller";
import useLoadingStore from "@/store/useLoadingStore";
import useLogedUserStore from "@/store/useLogedUser";
import getCookie from "@/utilis/helper/cookie/gettooken";
import setCookie from "@/utilis/helper/cookie/setcookie";
import MakePost from "@/utilis/requestrespose/post";
import { usePathname, useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import DeshboardNavigation from "../../componnent/Deshboardnavigation";
import SpinLoader from "../../componnent/SpingLoader";

const Deshboardlayout = ({ children }) => {

    const token = getCookie();
    const pathName = usePathname();
    const router = useRouter();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const { isSideberOpen, setisSideberOpen } = usedeshboardsidebercontroller();
    const { isLoading, setLoading } = useLoadingStore();
    const isDeshboard = pathName.startsWith("/deshboard");



    /*************** handle logout funciton is here ******************/
    const handlelogout = async () => {

        setLoading(true);

        const response = await MakePost('api/auth/logout', {}, token);

        if (response.success) {
            setCookie("token", '', 1);
            setCookie("id", '', 1)
            setCookie("name", '', 1);
            setCookie("role", '', 1);
            setLoginUser({ name: null, token: null, role: null });
            setLoading(false);
            router.push('/signin');
            toast.success(response.message);
        } else {
            setLoading(false);
            toast.error("Somethign went Wrong");
        }


    }


    return (
        <div className="h-fit text-black">
            {
                <div className={`fixed flex lg:hidden z-50 text-balck items-center justify-center rounded-md  p-2 ml-4 -translate-y-[75px] mt-4 cursor-pointer z-90000`}>

                    {
                        isSideberOpen ? (
                            <RxCross2 className="text-gray-700 text-3xl transition duration-300 hover:rotate-180" onClick={() => { setisSideberOpen(false) }} />
                        ) : (
                            <FaBars className="text-gray-700 text-3xl" onClick={() => { setisSideberOpen(true) }} />
                        )
                    }


                </div>
            }
            <div className="">
                <div className={`fixed bg-white border-r border-gray-200 w-[250px] h-screen px-3 py-4 z-50 ${isSideberOpen ? "block lg:block" : "hidden lg:block"}`}>


                    <DeshboardNavigation loginUser={loginUser} />


                    <button onClick={() => { handlelogout() }} className="bg-sky-400 text-white w-[90%] text-center py-2 rounded-md absolute bottom-24 left-3 cursor-pointer flex items-center justify-center gap-2">
                        {
                            isLoading && <SpinLoader />
                        }
                        Log out
                    </button>
                </div>
                <div className="px-6 w-full h-fit pt-6 pl-6 lg:pl-[270px] min-h-screen h-fit pb-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-full relative z-40">
                        {children}
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </div>
    )
}

export default Deshboardlayout;
