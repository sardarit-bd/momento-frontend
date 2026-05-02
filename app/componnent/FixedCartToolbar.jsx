'use client'

const { default: useCartStore } = require("@/store/useCartStore");
const { default: Link } = require("next/link")
import { FiShoppingCart } from "react-icons/fi";

const FixedcartToolbar = () => {

    const { cart } = useCartStore();


    return (
        <Link className="bg-sky-400 text-white fixed top-[200px] p-3 rounded-l-md shadow-lg right-0 z-90 hover:bg-sky-500 transition-all duration-300" href={'/my-cart'}>
            <FiShoppingCart className="text-xl" />
            {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow border border-white">
                    {cart.length}
                </span>
            )}
        </Link>
    )
}

export default FixedcartToolbar;