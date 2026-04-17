import Image from "next/image";


const TradingCardThumnail = ({ card, onClick, shot }) => {


    return (
        <div className="w-[50px] w-full h-auto relative rounded-lg cursor-pointer overflow-hidden" onClick={onClick}>
            <Image
                className="rounded-md transition-transform duration-300 hover:scale-[1.02]"
                width={1000}
                height={1000}
                src={card}
                alt="base"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
        </div>
    )
};

export default TradingCardThumnail;
