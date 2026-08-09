'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavigation = ({ loginUser }) => {

    const pathName = usePathname();


    /********** admin Nav items **********/
    const adminNavItems = [
        {
            name: "Dashboard",
            nested: false,
            sub: [],
            link: "/dashboard/admin"
        },
        {
            name: "All Users",
            nested: false,
            sub: [],
            link: "/dashboard/admin/alluser"
        },
        {
            name: "All Orders",
            nested: false,
            sub: [],
            link: "/dashboard/admin/orders"
        },
        {
            name: "All Products",
            nested: false,
            sub: [],
            link: "/dashboard/admin/allproducts"
        },
        {
            name: "Add Category",
            nested: false,
            sub: [],
            link: "/dashboard/admin/category"
        },
        {
            name: "Add Product",
            nested: false,
            sub: [],
            link: "/dashboard/admin/product"
        },
        {
            name: "Contact",
            nested: false,
            sub: [],
            link: "/dashboard/admin/contact"
        },
        {
            name: "Profile",
            nested: false,
            sub: [],
            link: "/dashboard/profile"
        },
        {
            name: "Site Settings",
            nested: false,
            sub: [],
            link: "/dashboard/admin/settings"
        },
    ]



    /********** customer Nav items **********/
    const customerNavItems = [
        // {
        //     name: "Dashboard",
        //     nested: false,
        //     sub: [],
        //     link: "/dashboard/customer"
        // },
        {
            name: "My Orders",
            nested: false,
            sub: [],
            link: "/dashboard/customer/orders"
        },
        // {
        //     name: "Payment History",
        //     nested: false,
        //     sub: [],
        //     link: "/dashboard/customer/payment"
        // },
        {
            name: "Profile",
            nested: false,
            sub: [],
            link: "/dashboard/profile"
        },
    ]



    return (
        <div>
            {
                loginUser?.role == "Admin" ? (

                    <div className="flex flex-col items-start lg:items-center gap-4 lg:gap-2 text-gray-500 mt-3 w-full z-50">

                        {
                            adminNavItems?.map((item, index) => {
                                return (
                                    <Link key={index} className={`font-semibold text-md text-nowrap py-3 px-2 rounded-md lg:px-4 lg:py-3 hover:bg-sky-100 w-full ${pathName === item?.link && "bg-sky-100"}`} href={item?.link}>{item?.name}</Link>
                                )
                            })
                        }

                    </div>


                ) : (

                    <div className="flex flex-col items-start lg:items-center gap-4 lg:gap-2 text-gray-500 mt-3 w-full">


                        {
                            customerNavItems?.map((item, index) => {
                                return (
                                    <Link key={index} className={`font-semibold text-md text-nowrap py-3 px-2 rounded-md lg:px-4 lg:py-3 hover:bg-sky-100 w-full ${pathName === item?.link && "bg-sky-100"}`} href={item?.link}>{item?.name}</Link>
                                )
                            })
                        }


                    </div>

                )
            }

        </div>
    )
}

export default DashboardNavigation;