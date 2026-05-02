"use client";
import RecentOrdersSkeleton from "@/app/componnent/skelaton/RecentOrdersSkeleton";
import { useRouter } from "next/navigation";


export default function MyPurchases({ purchases = [] }) {



    const router = useRouter();

    router.push('/deshboard/customer/orders');


    return (
        <RecentOrdersSkeleton />
    );
}
