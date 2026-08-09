import Image from "next/image";
import boxprevew from "../../../public/boxprevew.png";


const layers = [
    "dresses", "skin_tones", "hairs", "crowns",
    "beards", "eyes", "mouths", "noses"
];



const BoxContentForDeckCard = ({ activeCard, boxref, boxTitle }) => {
    return (
        <div className="h-full w-full rounded-md p-2 flex items-center justify-center">
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-black text-xl font-bold">Deck card Box Preview</h1>
                <div ref={boxref} className="relative">
                    <Image src={boxprevew} alt="Box-preview" />
                    <div className="absolute w-[60px] h-[63px] md:w-[90px] md:h-[95px] lg:w-[120px] lg:h-[115px] bottom-18 right-14.5 md:bottom-29 md:right-23 lg:bottom-36 lg:right-27">
                        {layers.map(layer =>
                            activeCard?.selectedLayers[layer] && (
                                <div key={layer}>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={activeCard.selectedLayers[layer]}
                                        alt={layer}
                                        className="w-full h-full absolute inset-0 object-cover bg-transparent"
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <div className="absolute inset-0">
                        <span className="text-black absolute font-semibold text-center w-[85px] text-[8px] md:text-[10.5px] lg:text-[12px] top-[161px] left-[150.5px] md:top-[245px] md:left-[254px] lg:top-[302px] lg:left-[323px] GustanBlackFont">
                            {boxTitle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxContentForDeckCard;