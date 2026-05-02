function formatTime(timeString, options = {}) {
    if (!timeString || typeof timeString !== "string") {
        return "";
    }

    const parts = timeString.split(":").map(Number);

    // Support both HH:mm and HH:mm:ss
    const hours = parts[0];
    const minutes = parts[1] ?? 0;
    const seconds = parts[2] ?? 0;

    // Guard: invalid values
    if (
        isNaN(hours) || hours < 0 || hours > 23 ||
        isNaN(minutes) || minutes < 0 || minutes > 59 ||
        isNaN(seconds) || seconds < 0 || seconds > 59
    ) {
        return "Invalid time";
    }

    const date = new Date();
    date.setHours(hours, minutes, seconds);

    const formatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        ...options,
    };

    return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
}

export default formatTime;
