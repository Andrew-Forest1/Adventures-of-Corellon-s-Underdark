import { useState } from "react";

function CharacterAbility({ability, character, setCharacter, abilityController}){
    const [flag, setFlag] = useState(null);

    const handleClick = () => {
        if(flag){
            setFlag(null)
        }else{
            if(!errorMessage(ability)){
                abilityController.main(ability)
            }
        }
    }

    const errorMessage = (ability) => {
        if(ability.cooldownCounter > 0){
            setFlag("Ability on Cooldown")
        }else if(ability.uses < 1){
            setFlag("Out of Ability Uses")
        }else if(ability.manaCost > abilityController.player.mana ){
            setFlag("Not Enough Mana")
        }else{   
            return null
        }
    }

    return(
        <button onClick={handleClick}>
            {flag ? <h2>{flag}</h2> : 
                <>
                    <h3>{ability.name}</h3>
                    {ability === abilityController.abilityController.casting ? <>
                        <span>Casting: Ready {ability.castingCounter == 1 ? "to use" : `in ${ability.castingCounter - 1} turns`} </span>
                    </> : 
                    <>
                        <span>Cast Time: {ability.castTime === 0 ? "Instant" : `${ability.castTime} Turn(s)`} </span>
                        <> | </>
                        {ability.cooldownCounter == 0 ? <span>Ready</span> : <span>Ready in {ability.cooldownCounter} Turn(s)</span>}
                        <> | </>
                        <span>Uses: {ability.uses} / {ability.maxUses}</span>
                    </>}
                </>
            }
        </button>
    )
}

export default CharacterAbility