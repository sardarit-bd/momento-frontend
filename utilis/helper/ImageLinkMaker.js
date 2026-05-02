const ImageLinkMaker = (link) => {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const final = `${baseUrl}/public/${link}`
    return final;
}

export default ImageLinkMaker;