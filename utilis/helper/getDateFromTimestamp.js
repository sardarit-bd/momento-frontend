function getDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    // Format as YYYY-MM-DD
    return date.toISOString().split("T")[0];
}


export default getDateFromTimestamp;