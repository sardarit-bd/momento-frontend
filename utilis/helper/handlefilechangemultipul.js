import { toast } from "react-toastify";
import imageToBase64 from "./imageToBase64";

const handleFileChangeMultipul = async (e, seter, productImages) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const invalidFile = files.find((file) => !allowedTypes.includes(file.type));
  if (invalidFile) {
    toast.warn("Only JPG, JPEG, or PNG files are allowed.");
    e.target.value = "";
    return;
  }
  const base64Images = await Promise.all(
    files.map((file) => imageToBase64(file)),
  );
  seter([...productImages, ...base64Images]);
  e.target.value = "";
};

export default handleFileChangeMultipul;
