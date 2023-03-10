import { useState, useContext } from 'react'
import { DragContext } from '../context/dragContext'
import EnemyAbility from './EnemyAbility';

function EnemyAbilities({enemy, setEnemy}){
    
    const { drag, setDrag } = useContext(DragContext)

    const handleDrop = (e) => {
        e.preventDefault()
        const slotnum = enemy.abilities.length + 1
        fetch("/enemy_abilities", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({enemy_id: enemy.id, ability_id: drag.id, slot: slotnum})
        })
        .then((res) => {
          if(res.ok){
            res.json()
            .then((res) => {
                //console.log(res)
                setEnemy(current => {return {...current, abilities: [...res.abilities]}})
            })
          } else {
            res.json()
            .then(msg => alert(msg.errors))
          }
        })

        setDrag(null)
    }

    const displayAbilities = enemy.abilities.map(ability => <EnemyAbility enemy={enemy} setEnemy={setEnemy} ability={ability} key={`${enemy.name}-${ability.name}`}/>)  

    return(
        <div className='characterAbilities'>
            {displayAbilities}
            <h2 onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}>Add Ability</h2>
        </div>
    )
}

export default EnemyAbilities