import { toast } from "react-toastify";
import imageToBase64 from "./imageToBase64";

const handlemultipulfilechangeForcustomaizationbaseUrl = async (e, seter, productImages, type, slotName = '') => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    const invalidFile = files.find(file => !allowedTypes.includes(file.type));
    if (invalidFile) {
        toast.warn("Only JPG, JPEG, or PNG files are allowed.");
        e.target.value = "";
        return;
    }

    // Store BOTH base64, original filename, AND slot name
    const imageObjects = await Promise.all(
        files.map(async (file) => ({
            base64: await imageToBase64(file),
            filename: file.name,
            name: slotName,
        }))
    );

    if (!productImages || productImages.length === 0) {
        seter([{ card_type: type, images: imageObjects }]);
    } else {
        const isFind = productImages?.find((item) => item.card_type === type);
        if (!isFind) {
            seter([...productImages, { card_type: type, images: imageObjects }]);
            e.target.value = "";
            return;
        }

        const updatearray = productImages?.map((item) => {
            if (item.card_type === type) {
                return { ...item, images: [...item.images, ...imageObjects] };
            }
            return item;
        });

        seter(updatearray);
    }

    e.target.value = "";
};

export default handlemultipulfilechangeForcustomaizationbaseUrl;