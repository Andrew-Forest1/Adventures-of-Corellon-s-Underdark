import {useState, useContext} from 'react'
import { CharacterContext } from './context/userContext'
import { useNavigate } from "react-router-dom";

function Character({character}){
    const {setCharacter} = useContext(CharacterContext)
    const navigate = useNavigate()

    const handleClick = () => {
        fetch("/select_character",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
          })
          .then(resp => {
            if (resp.ok) {
              resp.json().then(character => {
                setCharacter(character)
              })
            } else {
              resp.json().then(messageObj => alert(messageObj.errors))
            }
          })
        navigate(`${character.id}`)
    }



    return(
        <div className='character'>
            <h1>{character.name} Level: {character.level}</h1>
            <img src={character.image_url}/>
            <p>Strength: {character.strength}</p>
            <p>Agility: {character.agility}</p>
            <p>Intellect: {character.intellect}</p>
            <p>Vitality: {character.vitality}</p>
            <p>Spirit: {character.spirit}</p>
            <button onClick={handleClick}>Select</button>
        </div>
    )
}

export default Character