import Consumable from "./Consumable"

function CharacterItems({character, abilityController}){

    const displayConsumables = character.consumables.map(consumable => <Consumable consumable={consumable} abilityController={abilityController}/>)

    return(
        <div>
            {displayConsumables}
        </div>
    )
}

export default CharacterItems