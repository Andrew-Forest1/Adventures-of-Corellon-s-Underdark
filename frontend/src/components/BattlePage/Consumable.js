import { useContext, useState } from "react"
import { CharacterContext } from '../context/userContext'

function Consumable({consumable, abilityController}){
    const [use, setUse] = useState(consumable.amount > 0);
    const handleClick = () => {
        if(consumable.amount > 0){
            abilityController.main({...consumable.abilities[0], origin: "consumable", type: consumable.abilities[0].ability_type, consumable: consumable})
        }else{
            setUse(false)
        }
    }

    return (
        <div>
            {consumable.name} x{consumable.amount} 
            <button onClick={handleClick}>{use? "Use" : `Not Enough ${consumable.name}`}</button>
        </div>
    )
}

export default Consumable