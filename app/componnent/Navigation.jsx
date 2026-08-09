'use client'

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import useLogedUserStore from "@/store/useLogedUser";
import getCookie from "@/utilis/helper/cookie/gettooken";
import setCookie from "@/utilis/helper/cookie/setcookie";
import MakePost from "@/utilis/requestrespose/post";
import { toast } from "react-toastify";

const Navigation = ({ isOpen, setisOpen }) => {
    const navRef = useRef(null);
    const router = useRouter();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const token = getCookie();

    useEffect(() => {
        const update = () => {
            const h = navRef.current?.offsetHeight ?? 56;
            document.documentElement.style.setProperty("--navbar-height", h + "px");
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const handlelogout = async () => {
        const response = await MakePost('api/auth/logout', {}, token);
        if (response.success) {
            setCookie("token", '', 0);
            setCookie("id",    '', 0);
            setCookie("name",  '', 0);
            setCookie("role",  '', 0);
            setLoginUser({ name: null, token: null, role: null });
            setisOpen(false);
            router.push('/signin');
            toast.success(response.message);
        } else {
            toast.error("Something went Wrong");
        }
    };

    const navItems = [
        { name: "Home",         link: "/" },
        { name: "About",        link: "/about" },
        { name: "Shop",         link: "/shop" },
        { name: "How it Works", link: "/howitwork" },
        { name: "Inspirations", link: "/inspirations" },
        { name: "Contact Us",   link: "/contact" },
    ];

    const pathname = usePathname();

    return (
        <nav ref={navRef} className={`${isOpen ? "flex items-start" : "hidden"} lg:flex lg:items-center h-screen w-screen lg:w-fit lg:h-full absolute top-[75px] left-0 lg:static bg-white border border-r border-gray-300 lg:border-0`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-7 text-gray-500 mt-10 lg:mt-0 px-4 pr-6 lg:pr-0 lg:pl-0 w-full h-full lg:h-auto">

                {/* Nav links — unchanged */}
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        onClick={() => setisOpen(false)}
                        className={`font-semibold text-md text-nowrap py-3 px-2 rounded-md lg:px-1 lg:py-0 hover:bg-sky-100 w-full ${pathname === item.link && 'bg-sky-100'}`}
                        href={item.link}
                    >
                        {item.name}
                    </Link>
                ))}

                {/* ✅ Logout button — mobile only, pinned to bottom */}
                {loginUser?.token && (
                    <button
                        onClick={handlelogout}
                        className="lg:hidden mt-auto mb-32 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold hover:from-sky-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                    >
                        <TbLogout2 className="text-xl" />
                        <span>Logout</span>
                    </button>
                )}

            </div>
        </nav>
    );
};

export default Navigation;