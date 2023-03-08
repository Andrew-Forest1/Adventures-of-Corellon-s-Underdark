import {useState, useContext, useEffect} from 'react'
import { CharacterContext, UserContext } from '../context/userContext'
import { useNavigate } from "react-router-dom";
import CharacterAbilities from './CharacterAbilities';
import SkipAbility from './SkipAbility';
import UseItem from './UseItem';

function Character({character, abilityController}){
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    if(!character) return <h1>Loading</h1>

    return(
        <div className='BattleCharacter'>
            <h2>{character.name} Level: {character.level}</h2>
            <img src={character.image_url}/>
            <div>
                <span>Health: {character.health} / {character.vitality * 10 + 90}</span>
                <span>  |   </span>
                <span>Mana: {character.mana} / {character.spirit * 10 + 90}</span>
            </div>
            <br/>
            <CharacterAbilities abilities={abilityController.player.abilities} character={character} abilityController={abilityController}/>
            <SkipAbility abilityController={abilityController}/>
            <UseItem abilityController={abilityController}/>
        </div>
    )
}

export default Character