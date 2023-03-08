import {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import enemyAbilities from './enemyAbilities';

function Enemy({enemy, health, mana}){
    // const { user } = useContext(UserContext)
    const navigate = useNavigate()

    if(!enemy) return <h1>Loading</h1>

    return(
        <div className='BattleEnemy'>
            <h1>{enemy.name} Level: {enemy.level}</h1>
            <img width={200} src={enemy.image_url}/>
            <div>
                <span>Health: {enemy.health} / {enemy.vitality * 10 + 90}</span>
                <span>  |   </span>
                <span>Mana: {enemy.mana} / {enemy.spirit * 10 + 90}</span>
            </div>
            <label>Strength: {enemy.strength}</label>
            <label>Agility: {enemy.agility}</label>
            <label>Intellect: {enemy.intellect}</label>
            <label>Vitality: {enemy.vitality}</label>
            <label>Spirit: {enemy.spirit}</label>
            <br/>
            {/* <enemyAbilities abilities={enemy.abilities} enemy={enemy} setenemy={setenemy}/> */}
        </div>
    )
}

export default Enemy