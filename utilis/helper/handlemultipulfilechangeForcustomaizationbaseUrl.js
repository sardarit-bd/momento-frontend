import { toast } from "react-toastify";
import imageToBase64 from "./imageToBase64";

const handlemultipulfilechangeForcustomaizationbaseUrl = async (e, seter, productImages, type) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // Check invalid files
    const invalidFile = files.find(file => !allowedTypes.includes(file.type));
    if (invalidFile) {
        toast.warn("Only JPG, JPEG, or PNG files are allowed.");
        e.target.value = ""; // reset the input
        return;
    }

    // Convert all files to Base64
    const base64Images = await Promise.all(files.map(file => imageToBase64(file)));


    // If empty
    if (!productImages || productImages.length === 0) {
        seter([{ card_type: type, images: base64Images }]);
    } else {

        const isFind = productImages?.find((item) => item.card_type == type);
        if (!isFind) {

            seter([...productImages, { card_type: type, images: base64Images }]);
            return;
        }

        const updatearray = productImages?.map((item, index) => {

            if (item.card_type === type) {

                return {
                    ...item,
                    images: [...item.images, ...base64Images]
                }
            }

            return item;
        });

        seter(updatearray);

    }

    // Reset input so user can select the same file again if needed
    e.target.value = "";

    return;
};

export default handlemultipulfilechangeForcustomaizationbaseUrl;
