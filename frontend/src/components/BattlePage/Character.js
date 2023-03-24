import {useState, useContext, useEffect} from 'react'
import { CharacterContext, UserContext } from '../context/userContext'
import { useNavigate } from "react-router-dom";
import CharacterAbilities from './CharacterAbilities';
import SkipAbility from './SkipAbility';
import UseItem from './UseItem';
import CharacterItems from './CharacterItems';

function Character({character, abilityController}){
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [showItems, setShowItems] = useState(false);

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
            <div className='battleControls'>
                {showItems ? 
                <>
                    <CharacterItems character={character} abilityController={abilityController}/>
                    <button onClick={() => {setShowItems(current => !current)}}>Back</button>
                </>
                :
                <>
                    <CharacterAbilities abilities={abilityController.player.abilities} character={character} abilityController={abilityController}/>
                    <SkipAbility abilityController={abilityController}/>
                    <UseItem setShowItems={setShowItems}/>
                </>
                }
            </div>
        </div>
    )
}

export default Character