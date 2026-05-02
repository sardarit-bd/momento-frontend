function hasImageExtension(url) {

    if (url?.startsWith("blob:")) return true;

    return /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff)$/i.test(url);
}


export default hasImageExtension;
