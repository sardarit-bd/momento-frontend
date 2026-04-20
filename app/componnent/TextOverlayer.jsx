import GradientText from "./GradientText";

export const FrontOne = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative">
            <span className="text-white text-[10px] lg:text-xs AileronFont tracking-wider font-thin absolute top-71 left-[24px] lg:top-111 lg:left-8 text-center w-[205px] lg:w-[320px] z-50">{carddes}</span>

            <div className="absolute left-[25px] right-[25px] bottom-[33px] h-1/3 z-40 pointer-events-none rounded-bl-2xl rounded-br-2xl overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.62) 100%)" }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.58) 100%)" }}
                />
            </div>

            <div className="absolute left-[40px] bottom-[60px] z-50 w-[110px] lg:w-[130px]">
                <span className="block text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium text-left">{name}</span>
                <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full mt-0.5">
                    <div style={{ width: `${labelone}%` }} className="h-full bg-[#f56f41] rounded-full" />
                </div>

                <span className="block text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium text-left mt-1 lg:mt-1.5">{name2}</span>
                <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full mt-0.5">
                    <div style={{ width: `${labeltwo}%` }} className="h-full bg-[#f56f41] rounded-full" />
                </div>

                <span className="block text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium text-left mt-1 lg:mt-1.5">{name3}</span>
                <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full mt-0.5">
                    <div style={{ width: `${labelthree}%` }} className="h-full bg-[#f56f41] rounded-full" />
                </div>
            </div>

            <div className="absolute right-[40px] bottom-[60px] z-50 w-[115px] lg:w-[180px] text-right">
                <span className="block uppercase text-xs lg:text-4xl RamaGothicFont font-bold leading-tight TradingCardTitleMetal">{cardti}</span>
                <span className="block text-[#5ba2d7] RamaGothicFont font-bold lg:font-extrabold text-[10px] lg:text-lg tracking-tighter leading-tight mt-1">{acarddate}</span>
            </div>
            <span className="absolute bottom-[33px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[10px] text-[#1f1f1f] BrunsonFont tracking-wide text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontTwo = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative">
            <span className="text-gray-50 text-[10px] lg:text-xs AileronFont tracking-wider font-thin absolute top-70 left-[24px] lg:top-108.5 lg:left-8 text-center w-[205px] lg:w-[320px] z-50">{carddes}</span>

            <div className="absolute left-[25px] right-[25px] bottom-[33px] h-1/3 z-40 pointer-events-none rounded-bl-2xl rounded-br-2xl overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.62) 100%)" }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.58) 100%)" }}
                />
            </div>

            <div className="absolute left-[25px] bottom-[33px] z-50 w-[110px] lg:w-[130px]">
                <span className="block text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider text-left">{name}</span>
                <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full mt-0.5">
                    <div style={{ width: `${labelone}%` }} className="h-full bg-[#5ba2d8] rounded-full" />
                </div>

                <span className="block text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider text-left mt-1 lg:mt-1.5">{name2}</span>
                <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full mt-0.5">
                    <div style={{ width: `${labeltwo}%` }} className="h-full bg-[#5ba2d8] rounded-full" />
                </div>

                <span className="block text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider text-left mt-1 lg:mt-1.5">{name3}</span>
                <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full mt-0.5">
                    <div style={{ width: `${labelthree}%` }} className="h-full bg-[#5ba2d8] rounded-full" />
                </div>
            </div>

            <div className="absolute right-[25px] bottom-[33px] z-50 w-[115px] lg:w-[180px] text-right">
                <span className="block text-white text-stroke uppercase text-sm lg:text-2xl GustanBlackFont font-bold lg:font-extrabold leading-tight">{cardti}</span>
                <span className="block text-[#5ba2d7] font-bold lg:font-extrabold text-[10px] lg:text-lg tracking-tighter leading-tight mt-1">{acarddate}</span>
            </div>
            <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[12px] text-[#1f1f1f] font-semibold tracking-wide text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontThree = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative">
            <span className="text-white text-[10px] lg:text-[11.5px] AileronFont tracking-wider font-thin absolute left-5 lg:left-7 top-63 lg:top-97 w-[160px] lg:w-[265px] z-50">{carddes}</span>

            <div className="absolute left-[25px] right-[25px] bottom-[33px] h-1/3 z-40 pointer-events-none rounded-bl-2xl rounded-br-2xl overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.62) 100%)" }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.58) 100%)" }}
                />
            </div>

            <div className="absolute left-[25px] bottom-[33px] z-50 w-[96px]">
                <span className="block text-white text-[8px] lg:text-xs AileronFont tracking-wider font-medium italic text-left">{name}</span>
                <div className="bg-white h-[5px] lg:h-[6.5px] rounded-full mt-0.5">
                    <div style={{ width: `${labelone}%` }} className="h-full bg-[#f56f41] rounded-full" />
                </div>

                <span className="block text-white text-[8px] lg:text-xs AileronFont tracking-wider font-medium italic text-left mt-1 lg:mt-1.5">{name2}</span>
                <div className="bg-white h-[5px] lg:h-[6.5px] rounded-full mt-0.5">
                    <div style={{ width: `${labeltwo}%` }} className="h-full bg-[#f56f41] rounded-full" />
                </div>

                <span className="block text-white text-[8px] lg:text-xs AileronFont tracking-wider font-medium italic text-left mt-1 lg:mt-1.5">{name3}</span>
                <div className="bg-white h-[5px] lg:h-[6.5px] rounded-full mt-0.5">
                    <div style={{ width: `${labelthree}%` }} className="h-full bg-[#f56f41] rounded-full" />
                </div>
            </div>

            <div className="absolute right-[25px] bottom-[33px] z-50 w-[130px] lg:w-[200px] text-right">
                <span className="block uppercase text-white font-extrabold text-xs lg:text-xl BrunsonFont leading-tight">{cardti}</span>
                <span className="block text-white font-semibold BrunsonFont tracking-widest lg:font-medium text-[10px] lg:text-3xl tracking-tighter leading-tight mt-1">{acarddate}</span>
            </div>
            <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[12px] text-[#1f1f1f] font-semibold tracking-wide text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontFour = ({ cardti, carddes, name, name2, name3, acarddate }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative">
            <span className="text-white text-xs font-bold absolute top-108 text-center w-[265px] left-8 z-50">{carddes}</span>

            <div className="absolute left-[25px] right-[25px] bottom-[33px] h-1/3 z-40 pointer-events-none rounded-bl-2xl rounded-br-2xl overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.62) 100%)" }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.58) 100%)" }}
                />
            </div>

            <div className="absolute left-[25px] bottom-[33px] z-50 w-[120px]">
                <span className="block text-white text-xs font-bold text-left">{name.toUpperCase()}</span>
                <span className="block text-white text-xs font-bold text-left mt-1">{name2}</span>
                <span className="block text-white text-xs font-bold text-left mt-1">{name3}</span>
            </div>

            <div className="absolute right-[25px] bottom-[33px] z-50 w-[130px] lg:w-[180px] text-right">
                <span className="block text-white text-sm lg:text-2xl font-bold tracking-widest bebas leading-tight">{cardti}</span>
                <span className="block text-[#5ba2d7] lg:font-extrabold text-[10px] lg:text-lg tracking-tighter leading-tight mt-1">{acarddate}</span>
            </div>
            <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[12px] text-[#1f1f1f] font-semibold tracking-wide text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const BackOne = ({ cardti, carddes, name, name2, name3, acarddate, isblack, highlights = [] }) => {
    const safeHighlights = Array.isArray(highlights) ? highlights.slice(0, 6) : [];
    return (
        <div className="w-full h-full relative">
            <span className={`${isblack ? "text-black" : "text-white"} text-md lg:text-2xl font-semibold lg:font-extrabold absolute top-7.5 lg:top-14 left-10 lg:left-26 text-center w-[170px] lg:w-[176px] z-50 tracking-tighter`}>{cardti.toUpperCase()}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-17 lg:top-26 left-11 lg:left-15 line-clamp-3 text-center w-[160px] lg:w-[270px] z-50`}>{carddes}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-sm lg:text-lg font-semibold lg:font-extrabold absolute top-30 lg:top-46.5 left-12 lg:left-18 text-left w-[176px] lg:w-[185px] z-50 tracking-tighter`}>{name.toUpperCase()}</span>

            {safeHighlights.length > 0 ? (
                <div className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-36.5 left-10 lg:top-57 lg:left-15 w-[170px] lg:w-[270px] z-50`}>
                    {safeHighlights.map((item, idx) => (
                        <span key={`${item}-${idx}`} className="block text-left mb-0.5 lg:mb-1 truncate">
                            {item}
                        </span>
                    ))}
                </div>
            ) : (
                <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-36.5 left-10 lg:top-57 lg:left-15 line-clamp-4 text-center w-[170px] lg:w-[270px] z-50`}>{name2}</span>
            )}

            <span className={`${isblack ? "text-black" : "text-white"} text-sm lg:text-lg font-semibold lg:font-extrabold absolute top-55.5 -left-4 lg:top-85.5 lg:left-35 text-right w-[176px] z-50 tracking-tighter`}>{name3.toUpperCase()}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-63 left-10 lg:top-96 lg:left-15 line-clamp-4 text-center w-[170px] lg:w-[270px] z-50`}>{acarddate}</span>
        </div>
    )
};
