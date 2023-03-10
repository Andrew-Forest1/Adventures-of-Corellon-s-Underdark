//import {UserContext, CharacterContext} from './context/userContext'
import React, { useState, useEffect, useContext } from 'react';
import Enemy from './Enemy';

function Enemies({}){
    const [enemies, setEnemies] = useState([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

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

    const sortEnemies = enemies.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    
      // names must be equal
      return 0;
    } )

    const handleSearch = (e) => {
      setSearch(e.target.value)
    }

    const filteredEnemies = enemies.filter(enemy => enemy.name.toLowerCase().includes(search.toLowerCase()))

    const displayEnemies = filteredEnemies.map(enemy => {
        return(
            <Enemy enemy={enemy} key={enemy.name}/>
        )
    })

    return (
      <div>
        <input type='text' placeholder='search by enemy name' value={search} onChange={handleSearch}/>
        {displayEnemies}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" onChange={handleChange} value={input} placeholder='New Enemy Name'/>
          <button type="submit" name="submit">Create Enemy</button>
        </form>
      </div>
    )
}

export default Enemies