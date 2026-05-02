import { toast } from "react-toastify";
import imageToBase64 from "./imageToBase64";

const handleFileChangeMultipul = async (e, seter, productImages) => {
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

    // ✅ Append new images to existing ones
    seter([...productImages, ...base64Images]);

    // Reset input so user can select the same file again if needed
    e.target.value = "";
};

export default handleFileChangeMultipul;
