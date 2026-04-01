"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import useboxcartstore from "@/store/useboxcartstore";
import useCartStore from "@/store/useCartStore";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";

const layers = [
    "dresses", "skin_tones", "hairs", "crowns",
    "beards", "eyes", "mouths", "noses"
];



const FinalCardsPage = () => {

    const [cards, setCards] = useState([]);
    const { addToCart } = useCartStore();
    const { deckcart, removeFromCart } = useDeckFinalPreview();
    const { boxs } = useboxcartstore();
    const [loading, setloading] = useState(false);
    const router = useRouter();



    const adddeckcart = (e) => {
        e.preventDefault();
        setloading(true);
        setTimeout(() => {
            addToCart(deckcart[0]);
            setloading(false);
        }, 900);

    }



    return (
        <div className="text-black max-w-7xl mx-auto" style={{ padding: "2rem" }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => { router.back() }} className="border border-gray-200 bg-white p-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-100">
                        <BiLeftArrowAlt className="text-2xl" />
                    </button>
                    <h1 className="text-xl text-gray-600 hidden md:block">Your Customized Cards</h1>
                </div>
                <div>
                    <button onClick={(e) => { adddeckcart(e) }} className="border border-gray-200 bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2">
                        {loading ? <SpinLoader /> : <IoCartOutline className="text-xl" />}
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="" style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: "2rem 0rem", margin: "45px 0px" }}>

                {
                    deckcart[0]?.FinalProduct?.map((card, idx) => (


                        <div className="flex items-center justify-center relative w-[200px] h-auto md:w-[220px] md:h-[330px] lg:w-[300px] lg:h-[400px] rounded-4xl border-2 border-transparent">
                            {card?.baseImage && (
                                <Image
                                    width={1000} height={1000} src={card.baseImage} alt="Base Card" className=" w-full h-full object-contain"
                                />
                            )}
                            {layers.map(layer =>
                                card?.selectedLayers[layer] && (
                                    <div key={layer}>
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src={card.selectedLayers[layer]}
                                            alt={layer}
                                            className="absolute top-[30px] md:top-[35px] lg:top-[80px] left-1/2 -translate-x-1/2 w-[65%] h-[40%] md:w-[60%] md:h-[40%] lg:w-[55%] lg:h-[30%] object-contain"
                                        />
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src={card.selectedLayers[layer]}
                                            alt={`${layer}-mirrored`}
                                            className="absolute bottom-[30px] md:bottom-[35px] lg:bottom-[80px] left-1/2 -translate-x-1/2 scale-y-[-1] w-[65%] h-[40%] md:w-[60%] md:h-[40%] lg:w-[55%] lg:h-[30%] object-contain"
                                        />
                                    </div>
                                )
                            )}
                        </div>


                    ))
                }


            </div>

            <div>
                <h2 className="py-4 font-semibold text-gray-600">Box Preview</h2>

                {
                    boxs?.map((item, index) => {
                        return (
                            <div key={index} className="w-[170px] h-auto lg:w-[400px] lg:h-auto flex items-center justify-center ">
                                <Image className="object-contain z-10" src={item} width={1000} height={1000} alt="final-cards" />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default FinalCardsPage;
