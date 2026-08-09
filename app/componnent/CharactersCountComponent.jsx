import countCharacters from "@/utilis/helper/countCharacter";

const CharactersCountComponent = ({ text, limit }) => {
    const result = countCharacters(text, limit);

    return (
        <div className="bg-sky-300 rounded-full px-2 py-0.5">
            <span className="text-white text-xs font-medium">
                {result}
            </span>
        </div>
    );
};

export default CharactersCountComponent;