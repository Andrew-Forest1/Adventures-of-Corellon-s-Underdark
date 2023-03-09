import CharacterAbility from './CharacterAbility'
import { useState } from 'react';

function CharacterAbilities({abilities, character, abilityController}){
    const displayAbilities = []
    const [show, setShow] = useState(false);

    for (let i = 0; i < 5; i++) {
        if(abilities[i]){
            displayAbilities[i] = <CharacterAbility ability={abilityController.abilityController.playerAbilities[i]} abilityController={abilityController}/>
        }else{
            displayAbilities[i] = <CharacterAbility ability={null} abilityController={abilityController}/>
        }
    }

    const controllerAbilities = abilityController.abilityController.playerAbilities.map(ability => {
        return (
            <div>
                <span>{ability.name}</span>
            </div>
        )
    })

    //console.log(abilityController.abilityController.playerAbilities)

    return(
        <div>
            {show ? controllerAbilities  : displayAbilities}
        </div>
    )
}

export default CharacterAbilities