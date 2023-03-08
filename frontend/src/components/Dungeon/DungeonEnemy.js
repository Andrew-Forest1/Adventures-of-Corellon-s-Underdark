import {useState, useEffect, useContext} from 'react'
import { CharacterContext, EnemyContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";

function Enemy({enemy, progresses}){
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

    return(
        <div>
            <h1>{enemy.name}</h1>
            <img width={150} src={enemy.image_url} alt={enemy.name}/>
            {defeated ? <span>Enemy Slain</span> : <button onClick={handleClick}>Fight</button>}
        </div>
    )
}

export default Enemy