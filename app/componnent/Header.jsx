'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.svg";
import useNavIsOpenStore from "../../store/useNavIsOpenStore";
import Navigation from "../componnent/Navigation";
import HeaderAuth from "./HeaderAuth";

const Header = () => {

    const { isOpen, setisOpen } = useNavIsOpenStore();

    const pathName = usePathname();
    const isApplication = pathName.startsWith("/application");
    const isDeshboard = pathName.startsWith("/deshboard");



    return (
        <header className="bg-white border border-b border-gray-200 h-[75px] w-full  fixed z-9000">
            <div className="flex items-center h-full w-full justify-center">
                <div className={`px-2 md:px-7 h-full w-full flex items-center justify-between ${!isApplication && !isDeshboard && "max-w-7xl"}`}>
                    <Link href={'/'} className={`flex items-center h-full ${isDeshboard && "pl-14 md:pl-10 lg:pl-0"}`}>
                        <Image src={logo} alt="Logo" className="w-[120px]" />
                    </Link>
                    <Navigation isOpen={isOpen} setisOpen={setisOpen} />


                    <HeaderAuth isOpen={isOpen} setisOpen={setisOpen} />

                </div>
            </div>
        </header>
    )
}

export default Header;