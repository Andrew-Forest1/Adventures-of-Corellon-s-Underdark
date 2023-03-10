import {UserContext, CharacterContext} from '../context/userContext'
import React, { useState, useEffect, useContext } from 'react';
import Character from './Character';

function Characters({}){
    const {user} = useContext(UserContext);
    const [characters, setCharacters] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch("/characters")
        .then((res) => {
          if(res.ok){
            res.json()
            .then((characters) => {
              setCharacters(characters)
            })
          } else {
            res.json()
            .then(msg => alert(msg.error))
        }
        })
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/characters", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user.id, name: input})
        })        
        .then((res) => {
        if(res.ok){
            res.json()
            .then((res) => {
                setCharacters(current => [...current, {...res}])
            })
        } else {
            res.json()
            .then(msg => alert(msg.error))
        }
        })
    }

    const filteredCharacters = characters.filter(character => character.user.id === user.id)

    const displayCharacters = filteredCharacters.map(character => {
        return(
            <Character character={character} setCharacters={setCharacters} key={character.name}/>
        )
    })

    return (
        <div>
            {displayCharacters}
            <div className='character'>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={handleChange} value={input} placeholder='new Character Name'/>
                    <button type='submit'>Create New Character</button>
                </form>
            </div>
        </div>
    )
}

export default Characters