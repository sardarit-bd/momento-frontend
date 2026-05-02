function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file || !(file instanceof Blob)) {
            reject(new Error("Parameter must be a File or Blob"));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = (error) => reject(error);
    });
}

export default imageToBase64;