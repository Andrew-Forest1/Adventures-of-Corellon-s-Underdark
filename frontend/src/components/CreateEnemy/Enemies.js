//import {UserContext, CharacterContext} from './context/userContext'
import React, { useState, useEffect, useContext } from 'react';
import Enemy from './Enemy';

function Enemies({}){
    const [enemies, setEnemies] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch("/enemies")
        .then((res) => {
          if(res.ok){
            res.json()
            .then((enemies) => {
              setEnemies(enemies)
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

        fetch("/enemies",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: input})
          })
          .then(res => {
            if (res.ok) {
              res.json().then(enemy => {
                setEnemies(current => [enemy, ...current])
              })
            } else {
              res.json()
              .then(msg => alert(msg.error))
            }
          })
    }

    const displayEnemies = enemies.map(enemy => {
        return(
            <Enemy enemy={enemy} key={enemy.name}/>
        )
    })

    return (
        <div>
            {displayEnemies}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} value={input} placeholder='New Enemy Name'/>
                <button type="submit" name="submit">Create Enemy</button>
            </form>
        </div>
    )
}

export default Enemies