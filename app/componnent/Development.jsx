'use client'

import { useRouter } from "next/navigation";

const Development = () => {

    const router = useRouter();

    return (
        <div className="text-black h-[90vh] flex items-center justify-center">
            <div className="shadow-xl px-10 py-7 rounded-md border border-gray-300">
                <h2 className="text-2xl">This page is Under Development</h2>

                <div className="flex items-center justify-center">
                    <button onClick={() => { router.back() }} className="text-white cursor-pointer bg-sky-400 px-3 py-1 rounded-md mt-4">Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default Development;