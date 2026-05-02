'use client'

import One from "@/app/componnent/One";
import Prograssber from "@/app/componnent/Progressbar";
import Three from "@/app/componnent/Three";
import Two from "@/app/componnent/Two";
import useProductUploadStore from "@/store/useProductUploadStore";

const AdminOrders = () => {

    const { rander, setrander } = useProductUploadStore();

    return (
        <div>
            <Prograssber />
            <div className="pt-6 pb-4">
                {rander === 1 && <One />}
                {rander === 2 && <Two />}
                {rander === 3 && <Three />}
            </div>
        </div>
    )
}

export default AdminOrders;






















