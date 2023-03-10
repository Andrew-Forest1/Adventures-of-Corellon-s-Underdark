import { useState } from 'react'

function EnemyAbility({ability, enemy, setEnemy}){
    const [hide, setHide] = useState(true);

    const handleClick = () => {
        fetch("/enemy_abilities/1", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({enemy_id: enemy.id, ability_id: ability.id})
        })        
        .then((res) => {
        if(res.ok){
            res.json()
            .then((res) => {
                setEnemy({...res})
            })
        } else {
            res.json()
            .then(msg => alert(msg.error))
        }
        })
    }

    const handleDrop = (e) => {
        e.preventDefault()
        debugger
    }

    return(
        <div className='enemyAbility' onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}>
            <h3>{ability.name}</h3>
            <p>Type: {ability.ability_type}</p>
            <p>{ability.damage > 0 ? `Damage: ${ability.damage}` : `Heal: ${-1 * ability.damage}`}</p>
            <p>Cooldown: {ability.cooldown}</p>
            <p>Effect: {ability.effect}</p>
            <p>Cast Time: {ability.cast === 0 ? "Instant" : `${ability.cast} Turn(s)`} </p>
            <button onClick={handleClick}>Remove</button>
        </div>
    )
}

export default EnemyAbility