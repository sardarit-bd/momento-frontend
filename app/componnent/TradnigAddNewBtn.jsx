import { FaPlus } from "react-icons/fa6";
import SpinLoader from "./SpingLoader";

const TrandingAddNewCardBtn = ({ addCard, Done, editmood, seteidtmood, doneloading }) => {
    return (
        <button onClick={editmood ? Done : addCard} className="bg-sky-500 text-white rounded-md text-center py-1 lg:py-3 px-1 lg:px-14 w-[30px] h-[30px] w-full h-fit font-semibold cursor-pointer flex gap-2 items-center justify-center shadow-xl focus:none">
            <FaPlus className="text-2xl lg:hidden" />
            <span className="hidden lg:flex items-center gap-2 justify-center text-nowrap">
                {
                    doneloading && <SpinLoader />
                }

                {
                    editmood ? "Add New" : "Add New"
                }
            </span>
        </button>
    )
}

export default TrandingAddNewCardBtn;