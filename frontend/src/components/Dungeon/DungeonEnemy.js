import {useState, useEffect, useContext} from 'react'
import { CharacterContext, DungeonEnemyContext, EnemyContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";

function Enemy({enemy, dungeon, dungeonEnemy, editMode, setDungeon}){
    const navigate = useNavigate()
    const {setEnemy} = useContext(EnemyContext);
    const {character} = useContext(CharacterContext)
    const { setDungeonEnemy } = useContext(DungeonEnemyContext)
    const defeated = character.progresses.find(progress => progress.dungeon_enemy_id == dungeonEnemy.id)

    const handleClick = () => {
        fetch(`/enemies/${enemy.id}`)
            .then((res) => {
            if(res.ok){
                res.json()
                .then((enemyObj) => {
                    setEnemy(enemyObj)
                    setDungeonEnemy(dungeonEnemy)
                    navigate("/battle")
                })
            }else{
                res.json()
                .then(msg => alert(msg.error))
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