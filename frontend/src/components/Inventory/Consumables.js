import { useContext } from "react"
import { CharacterContext } from '../context/userContext'
import Consumable from "./Consumable"

function Consumables({}){
    const { character } = useContext(CharacterContext)
    const uniqueConsumables = []

    character.consumables.forEach(consumable => {
        const found = uniqueConsumables.find(element => element.consumable.name === consumable.name)
        found ? found.quantity += 1 : uniqueConsumables.push({consumable: consumable, quantity: 1})
    })

    const displayConsumables = uniqueConsumables.map(consumable => <Consumable consumable={consumable}/>)

    return (
        <div>
            <h2>Consumables</h2>
            {displayConsumables}
        </div>
    )
}

export default Consumables