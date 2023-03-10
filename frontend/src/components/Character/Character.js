import {useState, useContext} from 'react'
import { CharacterContext } from '../context/userContext'
import { useNavigate } from "react-router-dom";

function Character({character, setCharacters}){
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
              resp.json().then(messageObj => alert(messageObj.error))
            }
          })
        navigate(`${character.id}`)
    }

    const handleDelete = () => {
      fetch(`/characters/${character.id}`,{
        method: "DELETE"
      })
      .then(resp => {
        if (resp.ok) {
            setCharacters(current => {
              const characterId = current.findIndex(ele => ele.id === character.id)
              return [...current.slice(0,characterId), ...current.slice(characterId + 1)]
          })
        } else {
          resp.json().then(messageObj => alert(messageObj.error))
        }
      })
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
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Character