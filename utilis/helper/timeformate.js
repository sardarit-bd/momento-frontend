function timeformate(timeString) {
    if (!timeString || typeof timeString !== "string") {
        return ""; // or return "Invalid time"
    }

    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds);

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(date);
}

export default timeformate;