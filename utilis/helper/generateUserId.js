function generateUserId() {
    const id = Math.floor(100000 + Math.random() * 900000).toString();
    return id;
}
export default generateUserId;
