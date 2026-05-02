import { toast } from "react-toastify";
import imageToBase64 from "./imageToBase64";

const handleFileChange = async (e, seter) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        toast.warn("Only JPG, JPEG, or PNG files are allowed.");
        e.target.value = ""; // reset the input
        return;
    }

    // ✅ File is valid
    seter(await imageToBase64(file));
};

export default handleFileChange;