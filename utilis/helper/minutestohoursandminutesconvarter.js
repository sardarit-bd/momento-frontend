function minutestohoursandminutesconvarter(value) {

    if (typeof value !== "number" || isNaN(value)) {
        return `-`
    }
    if (value < 60) {
        return `${value} Minutes`;
    }

    const bagfol = Math.floor(value / 60); // quotient
    const bagsesh = value % 60;           // remainder

    return `${bagfol} ${bagfol == 1 ? "Hour" : "Hours"} ${bagsesh} Minutes`;
}

export default minutestohoursandminutesconvarter;