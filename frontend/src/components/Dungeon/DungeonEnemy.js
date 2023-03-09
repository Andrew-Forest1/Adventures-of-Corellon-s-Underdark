import {useState, useEffect, useContext} from 'react'
import { CharacterContext, EnemyContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";

function Enemy({enemy, dungeon, progresses, editMode, setDungeon}){
    const navigate = useNavigate()
    const {setEnemy} = useContext(EnemyContext);
    const {character} = useContext(CharacterContext)
    const defeated = progresses.find(progress => progress.enemy_id === enemy.id && progress.character_id === character.id)

    const handleClick = () => {
        fetch(`/enemies/${enemy.id}`)
            .then((res) => {
            if(res.ok){
                res.json()
                .then((enemyObj) => {
                    setEnemy(enemyObj)
                    navigate("/battle")
                })
            }
        })
    }

    const handleRemove = () => {
        fetch(`/dungeon_enemies/1`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dungeon_id: dungeon.id, enemy_id: enemy.id})
        })
        .then(res => {
            if(res.ok){
                res.json()
                .then(dungeon => setDungeon({...dungeon}))
            }else{
                res.json()
                .then(msg => alert(msg.error))
            }
        })
    }

    return(
        <div>
            <h1>{enemy.name}</h1>
            <img width={150} src={enemy.image_url} alt={enemy.name}/>
            {defeated ? <span>Enemy Slain</span> : <button onClick={handleClick}>Fight</button>}
            {editMode ? <button onClick={handleRemove}>Remove</button> : null}
        </div>
    )
}

export default Enemy