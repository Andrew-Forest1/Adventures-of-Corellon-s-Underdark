import {useState, useContext} from 'react'
import { CharacterContext } from '../context/userContext'

function Character({}){
    const {character} = useContext(CharacterContext)

    return(
        <div className='character'>
            <h1>{character.name} Level: {character.level}</h1>
            <img src={character.image_url}/>
            <p>Health: {character.health} / {character.vitality * 10 + 90}</p>
            <p>Mana: {character.mana} / {character.spirit * 10 + 90}</p>
            <p>Strength: {character.strength}</p>
            <p>Agility: {character.agility}</p>
            <p>Intellect: {character.intellect}</p>
            <p>Vitality: {character.vitality}</p>
            <p>Spirit: {character.spirit}</p>
        </div>
    )
}

export default Character