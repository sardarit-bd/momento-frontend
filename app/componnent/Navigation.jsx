'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ isOpen, setisOpen }) => {


    const navItems = [
        {
            name: "Home",
            nested: false,
            sub: [],
            link: "/"
        },
        {
            name: "About",
            nested: false,
            sub: [],
            link: "/about"
        },
        {
            name: "Shop",
            nested: false,
            sub: [],
            link: "/shop"
        },
        {
            name: "How it Works",
            nested: false,
            sub: [],
            link: "/howitwork"
        },
        // {
        //     name: "Card Customization",
        //     nested: false,
        //     sub: [],
        //     link: "/card-customization"
        // },
        {
            name: "Inspirations",
            nested: false,
            sub: [],
            link: "/inspirations"
        },
        {
            name: "Contact Us",
            nested: false,
            sub: [],
            link: "/contact"
        },
    ]


    const pathname = usePathname();


    return (
        <nav className={`${isOpen ? "flex items-start" : "hidden"} lg:flex lg:items-center h-screen w-screen lg:w-fit lg:h-full absolute top-[75px] left-0 lg:static h-screen bg-white border border-r border-gray-300 lg:border-0`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-7 text-gray-500 mt-10 lg:mt-0 px-4 pr-6 lg:pr-0 lg:pl-0 w-full">

                {
                    navItems?.map((item, index) => {
                        return (
                            <Link key={index} onClick={() => { setisOpen(false) }} className={`font-semibold text-md text-nowrap py-3 px-2 rounded-md lg:px-1 lg:py-0 hover:bg-sky-100 w-full ${pathname == item?.link && 'bg-sky-100'}`} href={item?.link}>{item?.name}</Link>
                        )
                    })
                }

            </div>
        </nav >
    )
}

export default Navigation;