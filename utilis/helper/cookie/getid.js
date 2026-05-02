function getId() {


    if (typeof document === "undefined") return null; // check if running on server

    const value = `; ${document.cookie}`; // <-- prepend semicolon and space
    const parts = value.split(`; ${"id"}=`);

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

export default getId;
