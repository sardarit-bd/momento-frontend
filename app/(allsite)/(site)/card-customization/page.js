import CustomizationWork from "@/app/componnent/CustomizationWork";
import CustomOne from "@/app/componnent/CustomOne";
import GiftSection from "@/app/componnent/GiftSection";
import Passion from "@/app/componnent/Passion";

const CardCustomization = () => {
    return (
        <div className="text-gray-600 bg-white">
            <CustomOne />
            <CustomizationWork />
            <GiftSection />
            <Passion />
        </div>
    )
}

export default CardCustomization;