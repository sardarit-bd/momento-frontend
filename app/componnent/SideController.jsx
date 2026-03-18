import BaseSelector from "./BaseSelector";
import LayerSelector from "./LayerSelector";

const SideController = ({ product, activeCard, selectBase, selectLayer, editedCard, seteditedCard, activebaseEditCard, setactivebaseEditCard, RegainType }) => {
    return (
        <div className="max-h-[84vh] h-full" style={{ flex: 1, overflowY: "auto" }}>
            <h2 className="text-gray-800 font-semibold text-xl pt-4">{product.name}</h2>
            <BaseSelector product={product} activeCard={activeCard} selectBase={selectBase} editedCard={editedCard} seteditedCard={seteditedCard} activebaseEditCard={activebaseEditCard} setactivebaseEditCard={setactivebaseEditCard} RegainType={RegainType} />
            <LayerSelector product={product} activeCard={activeCard} selectLayer={selectLayer} />
        </div>
    )
}

export default SideController; 