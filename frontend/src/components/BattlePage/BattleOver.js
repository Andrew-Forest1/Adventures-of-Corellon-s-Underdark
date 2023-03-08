import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterContext, DungeonContext, EnemyContext } from "../context/userContext";

function BattleOver({battleOver}){
    const { dungeon } = useContext(DungeonContext)
    const { character } = useContext(CharacterContext)
    const { enemy } = useContext(EnemyContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(battleOver.outCome === "player"){
            fetch("/progresses",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({dungeon_id: dungeon.id, character_id: character.id, enemy_id: enemy.id})
            })
        }
    }, []);
    
    return(
        <div>
            {battleOver.outCome === "player" ? <span>You are Victorious</span> : <span>You have been Defeated</span>}
            <button onClick={() => navigate(`/dungeons/${dungeon.id}`)}>Continue</button>
        </div>
    )
}

export default BattleOver