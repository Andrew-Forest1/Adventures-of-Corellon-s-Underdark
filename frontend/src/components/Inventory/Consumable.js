import { useContext } from "react"
import { CharacterContext } from '../context/userContext'

function Consumable({consumable}){
    const handleClick = () => {
        
    }

    return (
        <div>
            {consumable.consumable.name} x{consumable.quantity} 
            <button onClick={handleClick}>Use</button>
        </div>
    )
}

export default Consumable