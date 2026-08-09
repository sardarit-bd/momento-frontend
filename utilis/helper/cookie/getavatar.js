function getAvatar() {


    if (typeof document === "undefined") return null; // check if running on server

    const value = `; ${document.cookie}`; // <-- prepend semicolon and space
    const parts = value.split(`; ${"avatar"}=`);

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

export default getAvatar;