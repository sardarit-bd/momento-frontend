function formatDateTime(isoString) {
    const date = new Date(isoString);

    return date.toLocaleString('en-GB', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour12: true,
    });



}

export default formatDateTime;