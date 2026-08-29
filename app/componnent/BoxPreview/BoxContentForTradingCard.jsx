import Image from "next/image";
import boxprevew from "../../../public/Booster Pack.png";

const BoxContentForTradingCard = ({ boxref, boxTitle, created }) => {
  return (
    <div className="h-full w-full rounded-md p-2 flex items-center justify-center">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-black text-xl text-center font-bold">
          Trading Card packageing Preview
        </h1>
        <div ref={boxref} className="relative w-75 lg:w-132.75 h-full">
          <Image
            className="w-full h-full"
            src={boxprevew}
            alt="Box-preview"
            width={1000}
            height={1000}
          />

          <div className="absolute inset-0 border">
            <span className="text-white absolute AileronFont text-[6px] lg:text-[9px] font-medium top-[155.5px] lg:top-[278.5px] left-19.5 lg:left-43.75 text-center w-21.25">
              {boxTitle}
            </span>
            <span className="text-white absolute AileronFont text-[6px] lg:text-[9px] font-medium top-[155.5px] lg:top-[278.5px] left-33.5 lg:left-68.25 text-center w-21.25">
              {created}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxContentForTradingCard;
