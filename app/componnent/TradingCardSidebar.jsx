import { RxCross2 } from "react-icons/rx";
import TradingCardThumnail from "./TradingCardThumnail";



const TradingCardSidebar = ({ cards, removeCard }) => {
    return (
        <div className="w-full border-b lg:border-r border-gray-200 bg-white h-full px-3 md:px-7 lg:px-8 py-3 z-20 shadow-sm">
            <h3 className="text-gray-700 font-semibold text-2xl pb-3 flex items-center justify-between">
                <span>Cards :</span>
                <div className="flex flex-row items-center gap-2">
                    <span className="text-gray-500 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{cards?.length}</span>
                </div>
            </h3>
            <div className="w-full lg:w-full flex flex-row lg:flex-col gap-4 items-center h-[80px] p-2 lg:h-fit snap-mandatory overflow-x-scroll cursor-grab lg:overflow-y-scroll scrollbar-hide lg:max-h-[77vh] lg:min-h-[77vh] bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                {cards?.map((card, idx) => (
                    <div
                        key={idx}
                        className="w-[60px] h-full lg:h-fit lg:w-full relative flex items-cemter justify-center rounded-xl z-0 snap-start border-2 border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <TradingCardThumnail
                            card={card}
                        />

                        <button className="bg-sky-600 absolute top-[-5px] right-[-5px] border-2 border-white text-white rounded-full w-6 h-6 cursor-pointer flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200" onClick={(e) => { e.stopPropagation(); removeCard(idx); }}>
                            <RxCross2 className="text-md" />
                        </button>
                    </div>
                ))}

            </div>
        </div>

    )
}

export default TradingCardSidebar;
