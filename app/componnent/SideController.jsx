import BaseSelector from "./BaseSelector";
import LayerSelector from "./LayerSelector";

const SideController = ({ product, cards, activeCard, selectBase, selectLayer, editedCard, seteditedCard, activebaseEditCard, setactivebaseEditCard }) => {
    return (
        <div className="pt-4">
            <h2 className="pb-3 text-xl font-semibold text-gray-800">{product.name}</h2>
            <BaseSelector product={product} cards={cards} activeCard={activeCard} selectBase={selectBase} editedCard={editedCard} seteditedCard={seteditedCard} activebaseEditCard={activebaseEditCard} setactivebaseEditCard={setactivebaseEditCard} />
            <LayerSelector product={product} activeCard={activeCard} selectLayer={selectLayer} />
        </div>
    )
}

export default SideController; 
