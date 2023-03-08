import { useState, useContext } from 'react'
import { DragContext } from './context/dragContext'

function Ability({ability}){
    const [hide, setHide] = useState(true);
    const { setDrag } = useContext(DragContext)

    const handleClick = () => {
        setHide(current => !current)
    }

    const handleDrag = (e) => {
        e.preventDefault()
    }

    const handleDragStart = (e) => {
        setDrag(ability)
    }

    return(
        <div className='Ability' onDrag={handleDrag} onDragStart={handleDragStart} draggable>
            <h2>{ability.name}</h2>
            {hide ? 
            <>
                <button onClick={handleClick}>Details</button>
            </> : 
            <>
                <p>Type: {ability.ability_type}</p>
                <p>{ability.damage > 0 ? `Damage: ${ability.damage}` : `Heal: ${-1 * ability.damage}`}</p>
                <p>Cooldown: {ability.cooldown}</p>
                <p>Effect: {ability.effect}</p>
                <p>Cast Time: {ability.cast === 0 ? "Instant" : `${ability.cast} Turn(s)`} </p>
                <p>Mana Cost: {ability.mana}</p>
                <button onClick={handleClick}>Hide</button>
            </>}
        </div>
    )
}

export default Ability