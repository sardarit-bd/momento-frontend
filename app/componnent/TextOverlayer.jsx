import GradientText from "./GradientText"

export const FrontOne = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree }) => {
    return (
        <div className="w-full h-full relative">

            <span className="text-white uppercase text-xs lg:text-xl font-bold absolute top-6 left-16.5 lg:top-9 lg:left-26 text-center w-[118px] lg:w-[182px] z-50 font-[GustanBlack]">{cardti}</span>

            <span className="text-white text-[10px] lg:text-xs AileronFont tracking-wider font-thin absolute top-71 left-[24px] lg:top-111 lg:left-8 text-center w-[205px] lg:w-[320px] z-50">{carddes}</span>

            <span className="text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium absolute top-79.5 left-[15px] lg:top-122 lg:left-8 text-center w-[67px] lg:w-[96px] z-50">{name}</span>


            <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full text-[10px] lg:text-xs font-bold absolute top-83 left-[19px] lg:top-127 lg:left-8 text-center w-[55px] lg:w-[96px] z-50">
                <div style={{ width: `${labelone}%` }} className={`h-full bg-[#f56f41] rounded-full`} />
            </div>

            <span className="text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium absolute top-79.5 left-[95px] lg:top-122 lg:left-36 text-center w-[67px] lg:w-[96px] z-50">{name2}</span>


            <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full text-[10px] lg:text-xs font-bold absolute top-83 left-[100px] lg:top-127 lg:left-36 text-center w-[55px] lg:w-[96px] z-50">
                <div style={{ width: `${labeltwo}%` }} className={`h-full bg-[#f56f41] rounded-full`} />
            </div>


            <span className="text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium absolute top-79.5 left-[169px] lg:top-122 lg:left-65 text-center w-[70px] lg:w-[96px] z-50">{name3}</span>


            <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full text-[10px] lg:text-xs font-bold absolute top-83 left-[174.5px] lg:top-127 lg:left-65 text-center w-[60px] lg:w-[58px] lg:w-[96px] z-50">
                <div style={{ width: `${labelthree}%` }} className={`h-full bg-[#f56f41] rounded-full`} />
            </div>

            <span className="text-[#5ba2d7] font-bold lg:font-extrabold absolute z-50 text-[10px] lg:text-md lg:text-lg w-[110px] lg:w-[180px] top-85 right-18 lg:top-130 lg:right-26 text-center tracking-tighter">{acarddate}</span>

        </div>
    )
}




export const FrontTwo = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree }) => {
    return (
        <div className="w-full h-full relative">


            <span className="text-white text-stroke uppercase text-sm lg:text-2xl GustanBlackFont font-bold lg:font-extrabold absolute top-63 left-16 lg:top-96 lg:left-23 text-center w-[128px] lg:w-[205px] z-50 font-[GustanBlack]">{cardti}</span>


            <span className="text-gray-50 text-[10px] lg:text-xs AileronFont tracking-wider font-thin absolute top-70 left-[24px] lg:top-108.5 lg:left-8 text-center w-[205px] lg:w-[320px] z-50">{carddes}</span>

            <span className="text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider absolute top-79.5 left-[15px] lg:top-122 lg:left-8 text-center w-[67px] lg:w-[96px] z-50">{name}</span>

            <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full text-[10px] lg:text-xs font-bold absolute top-82.5 left-[19px] lg:top-126 lg:left-8 text-center w-[55px] lg:w-[96px] z-50">
                <div style={{ width: `${labelone}%` }} className={`h-full bg-[#5ba2d8] rounded-full`} />
            </div>

            <span className="text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider absolute top-79.5 left-[95px] lg:top-122 lg:left-36 text-center w-[67px] lg:w-[96px] z-50">{name2}</span>

            <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full text-[10px] lg:text-xs font-bold absolute top-82 left-[100px] lg:top-126 lg:left-36 text-center w-[55px] lg:w-[96px] z-50">
                <div style={{ width: `${labeltwo}%` }} className={`h-full bg-[#5ba2d8] rounded-full`} />
            </div>

            <span className="text-[8px] lg:text-[11px] text-[#f7f7f7] GustanBlackFont tracking-wider absolute top-79.5 left-[169px] lg:top-122 lg:left-65 text-center w-[70px] lg:w-[96px] z-50">{name3}</span>


            <div className="bg-black border border-[#f7f7f7] h-[5px] lg:h-[8px] rounded-full text-[10px] lg:text-xs font-bold absolute top-82 left-[174.5px] lg:top-126 lg:left-65 text-center w-[60px] lg:w-[58px] lg:w-[96px] z-50">
                <div style={{ width: `${labelthree}%` }} className={`h-full bg-[#5ba2d8] rounded-full`} />
            </div>

            <span className="text-[#5ba2d7] font-bold lg:font-extrabold absolute z-50 text-[10px] lg:text-md lg:text-lg w-[110px] lg:w-[180px] top-85 right-18 lg:top-130 lg:right-26 text-center tracking-tighter">{acarddate}</span>

        </div>
    )
}




export const FrontThree = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree }) => {
    return (


        <div className="w-full h-full relative">

            <div className={"uppercase font-extrabold absolute top-[-3] left-14 lg:top-4 lg:left-21 w-[130px] lg:w-[250px] z-50"}>
                <GradientText text={cardti} />
            </div>



            <span className="text-white text-[10px] lg:text-[11.5px] AileronFont tracking-wider font-thin absolute  left-5 lg:left-7 top-63 lg:top-97 w-[160px] lg:w-[265px] z-50">{carddes}</span>

            <span className="text-white text-[8px] lg:text-xs AileronFont tracking-wider font-medium italic w-[62px] lg:w-[96px] absolute top-[311px] left-2 lg:top-120 lg:left-4 z-50">{name}</span>


            <div className="bg-white h-[5px] lg:h-[6.5px] rounded-full absolute top-[320.5px] left-2 lg:top-124 lg:left-4 w-[60px] lg:w-[96px] z-50">
                <div style={{ width: `${labelone}%` }} className={`h-full bg-[#f56f41] rounded-full`} />
            </div>

            <span className="text-white text-[8px] lg:text-xs AileronFont tracking-wider font-medium italic w-[62px] lg:w-[96px] absolute top-[328.5px] left-2 lg:top-126.5 lg:left-4 z-50">{name2}</span>


            <div className="bg-white h-[5px] lg:h-[6.5px] rounded-full absolute top-[338px] left-2 lg:top-130.5 lg:left-4 w-[60px] lg:w-[96px] z-50">
                <div style={{ width: `${labeltwo}%` }} className={`h-full bg-[#f56f41] rounded-full`} />
            </div>


            <span className="text-white text-[8px] lg:text-xs AileronFont tracking-wider font-medium italic w-[64px] lg:w-[96px] absolute top-[346px] left-2 lg:top-133 lg:left-4 z-50">{name3}</span>


            <div className="bg-white h-[5px] lg:h-[6.5px] rounded-full absolute top-[355.5px] left-2 lg:top-136.5 lg:left-4 w-[60px] lg:w-[96px] z-50">
                <div style={{ width: `${labelthree}%` }} className={`h-full bg-[#f56f41] rounded-full`} />
            </div>

            <span className="text-white font-semibold BrunsonFont tracking-widest lg:font-medium text-right absolute z-50 text-lg top-65 lg:text-4xl top-[320px] right-3 lg:top-122 lg:right-6 tracking-tighter w-[150px] lg:w-[250px]">{acarddate}</span>

        </div >
    )
}



export const FrontFour = ({ cardti, carddes, name, name2, name3, acarddate }) => {
    return (
        <div className="w-full h-full relative">

            <span className="text-white text-2xl font-bold absolute top-7 left-26 text-center w-[176px] z-50 tracking-widest bebas">{cardti}</span>

            <span className="text-white text-xs font-bold absolute top-108 text-center w-[320px] left-8 w-[265px] z-50 ">{carddes}</span>

            <span className="text-white text-xs font-bold absolute top-120 left-8 text-center w-[96px] z-50">{name.toUpperCase()}</span>

            <span className="text-white text-xs font-bold absolute top-120 left-36 text-center w-[96px] z-50">{name2}</span>

            <span className="text-white text-xs font-bold absolute top-120 left-65 text-center w-[96px] z-50">{name3}</span>

            <span className="text-[#5ba2d7] lg:font-extrabold absolute z-50 text-md top-28 lg:text-lg w-[180px] lg:top-128 lg:right-26 text-center tracking-tighter">{acarddate}</span>

        </div>
    )
}




export const BackOne = ({ cardti, carddes, name, name2, name3, acarddate, isblack }) => {
    return (
        <div className="w-full h-full relative">

            <span className={`${isblack ? "text-black" : "text-white"} text-md lg:text-2xl font-semibold lg:font-extrabold absolute top-7.5 lg:top-14 left-10 lg:left-26 text-center w-[170px] lg:w-[176px] z-50 tracking-tighter`}>{cardti.toUpperCase()}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-17 lg:top-26 left-11 lg:left-15 line-clamp-3 text-center w-[160px] lg:w-[270px] z-50`}>{carddes}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-sm lg:text-lg font-semibold lg:font-extrabold absolute top-30 lg:top-46.5 left-12 lg:left-18 text-left w-[176px] lg:w-[185px] z-50 tracking-tighter`}>{name.toUpperCase()}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-36.5 left-10 lg:top-57 lg:left-15 line-clamp-4 text-center w-[170px] lg:w-[270px] z-50`}>{name2}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-sm lg:text-lg font-semibold lg:font-extrabold absolute top-55.5 -left-4 lg:top-85.5 lg:left-35 text-right w-[176px] z-50 tracking-tighter`}>{name3.toUpperCase()}</span>

            <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-63 left-10 lg:top-96 lg:left-15 line-clamp-4 text-center w-[170px] lg:w-[270px] z-50`}>{acarddate}</span>

        </div>

    )
}




