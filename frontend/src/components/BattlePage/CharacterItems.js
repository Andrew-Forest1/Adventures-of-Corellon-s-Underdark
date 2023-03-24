import Consumable from "./Consumable"

function CharacterItems({character, abilityController}){
    const uniqueConsumables = []

    character.consumables.forEach(consumable => {
        const found = uniqueConsumables.find(element => element.consumable.name === consumable.name)
        found ? found.quantity += 1 : uniqueConsumables.push({consumable: consumable, quantity: 1})
    })

    const displayConsumables = uniqueConsumables.map(consumable => <Consumable consumable={consumable}/>)

    return(
        <div>
            {displayConsumables}
        </div>
    )
}

export default CharacterItems