import { useContext } from "react"
import { CharacterContext } from '../context/userContext'

function Inventory({}){
    const {character, setCharacter} = useContext(CharacterContext)

    const displayConsumables = character.consumables.map(consumable => <p>{consumable.name}</p>)

    return (
        <div>
            <p>Gold: {character.gold}</p>
            {displayConsumables}
        </div>
    )
}

export default Inventory