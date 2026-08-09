function countCharacters(text, limit) {
    if (typeof text !== "string") return 0;
    return `${text.length}/${limit}`;
}
export default countCharacters;