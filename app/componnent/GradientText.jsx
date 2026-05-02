
const GradientText = ({ text }) => {
    return (
        <svg
            width="270"
            height="80"
            viewBox="0 0 800 80"
        >
            <defs>
                <linearGradient id="textGradient" x1="0%" y1="90%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4e5863ff" />
                    <stop offset="25%" stopColor="#DDE6E8" />
                    <stop offset="50%" stopColor="#353f4aff" />
                    <stop offset="75%" stopColor="#DDE6E8" />
                    <stop offset="100%" stopColor="#303840ff" />
                </linearGradient>
            </defs>
            <text
                x="0"
                y="80"
                fontFamily="Brunson, sans-serif"
                fontSize="90"
                fontWeight="900"
                //letterSpacing="-12px"
                texttransform="uppercase"
                fill="url(#textGradient)"
            >
                {text}
            </text>
        </svg>
    );
};

export default GradientText;
