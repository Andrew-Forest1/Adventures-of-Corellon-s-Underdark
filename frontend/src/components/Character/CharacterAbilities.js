import { useState, useContext } from 'react'
import { DragContext } from '../context/dragContext'
import CharacterAbility from './CharacterAbility';
import { CharacterContext } from '../context/userContext'

function CharacterAbilities({abilities, character, setCharacter}){
    const displayAbilities = []
    const { drag, setDrag } = useContext(DragContext)
    //const { setCharacter } = useContext(CharacterContext)
    // abilities.map(ability => {
    //     return <CharacterAbility ability={ability} key={ability.name}/>
    // })

    const handleDrop = (e) => {
        e.preventDefault()
        const slotnum = character.abilities.length + 1
        fetch("/character_abilities", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({character_id: character.id, ability_id: drag.id, slot: slotnum})
        })
        .then((res) => {
          if(res.ok){
            res.json()
            .then((res) => {
                //console.log(res)
                setCharacter(current => {return {...current, abilities: [...res.abilities]}})
            })
          } else {
            res.json()
            .then(msg => alert(msg.error))
          }
        })

        setDrag(null)
    }

    for (let i = 0; i < 5; i++) {
        if(abilities[i]){
            displayAbilities[i] = <CharacterAbility character={character} setCharacter={setCharacter} ability={abilities[i]} key={`character-${abilities[i].name}`}/>
        }else{
            displayAbilities[i] = <div onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}>No Ability Selected</div>
        }
    }

    return(
        <div className='characterAbilities'>
            {displayAbilities}
        </div>
    )
}

export default CharacterAbilities