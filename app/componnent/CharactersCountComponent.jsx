import countCharacters from "@/utilis/helper/countCharacter";

const CharactersCountComponent = ({ text, limit }) => {

    const result = countCharacters(text, limit);

    return (
        <div className="absolute bottom-1 right-1 bg-sky-300 rounded-full px-1">
            <span className="text-white text-xs">{result}</span>
        </div>
    )
}

export default CharactersCountComponent;