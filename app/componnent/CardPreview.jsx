import Image from "next/image";

const layers = [
    "dresses", "skin_tones", "hairs", "crowns",
    "beards", "eyes", "mouths", "noses"
];



const CardPreview = ({ activeCard, previewCardNodeRef }) => {



    return (
        <div ref={previewCardNodeRef} className="flex items-center justify-center relative w-[200px] h-auto md:w-[270px] md:h-[370px] lg:w-[400px] lg:h-[600px] rounded-4xl border-2 border-transparent">
            {activeCard?.baseImage && (
                <Image
                    width={1000} height={1000} src={activeCard.baseImage} alt="Base Card" className=" w-full h-full object-contain"
                />
            )}
            {layers.map(layer =>
                activeCard?.selectedLayers[layer] && (
                    <div key={layer}>
                        <Image
                            width={1000}
                            height={1000}
                            src={activeCard.selectedLayers[layer]}
                            alt={layer}
                            className="absolute top-[10px] md:top-[32px] lg:top-[89px] left-1/2 -translate-x-1/2 w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-[30px]"
                        />
                        <Image
                            width={1000}
                            height={1000}
                            src={activeCard.selectedLayers[layer]}
                            alt={`${layer}-mirrored`}
                            className="absolute bottom-[10px] md:bottom-[32px] lg:bottom-[89px] left-1/2 -translate-x-1/2 scale-y-[-1] w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-[30px]"
                        />
                    </div>
                )
            )}
        </div>
    );
}

export default CardPreview;
