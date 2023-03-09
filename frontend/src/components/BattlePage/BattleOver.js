import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterContext, DungeonContext, EnemyContext } from "../context/userContext";

function BattleOver({battleOver, dungeonEnemy}){
    //*****************quick fixes with dungeon on this page, will have to reconsider how to change this in future******************************************
    const { dungeon } = useContext(DungeonContext)
    const { character, setCharacter } = useContext(CharacterContext)
    const { enemy } = useContext(EnemyContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(battleOver.outCome === "player"){
            fetch("/progresses",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({dungeon_id: dungeon ? dungeon.id : null, character_id: character.id, dungeon_enemy_id: dungeonEnemy.id})
            })
            .then(res => {if(res.ok){
                res.json()
                .then(progress => {
                    setCharacter(current => {return {...current, progresses: [...current.progresses, progress]}})})
            }else {
                res.json()
                .then(msg => alert(msg.error))
              }
            })
        }
    }, []);
    
    return(
        <div>
            {battleOver.outCome === "player" ? <span>You are Victorious</span> : <span>You have been Defeated</span>}
            {dungeon ? <button onClick={() => navigate(`/dungeons/${dungeon.id}`)}>Continue</button> : <span>Go to Menu - dungeons to Continue</span>}
        </div>
    )
}

export default BattleOver