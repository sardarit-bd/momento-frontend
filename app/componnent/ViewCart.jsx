import useCartStore from "@/store/useCartStore";
import { FiShoppingCart } from "react-icons/fi";

const { default: Link } = require("next/link")

const ViewCart = () => {

    const { cart } = useCartStore();

    return (
        <Link
            href={'/my-cart'}
            className="relative px-5 py-2 bg-sky-500 text-white font-semibold rounded-md shadow-md flex items-center gap-2"
        >
            <FiShoppingCart className="text-xl" />
            <span>View Cart</span>
            {/* Badge for cart length */}
            {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center shadow border border-white">
                    {cart.length}
                </span>
            )}
        </Link>
    )
}

export default ViewCart;