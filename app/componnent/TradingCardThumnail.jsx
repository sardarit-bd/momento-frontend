import Image from "next/image";


const TradingCardThumnail = ({ card, onClick, shot }) => {


    return (
        <div
            className="w-[50px] w-full h-auto  relative rounded-lg cursor-pointer"
            onClick={onClick}
        >
            <Image
                className="rounded-md"
                width={1000}
                height={1000}
                src={card}
                alt="base"
                style={{ width: "100%", height: "100%", objectFit: "container" }}
            />
        </div>
    )
};

export default TradingCardThumnail;