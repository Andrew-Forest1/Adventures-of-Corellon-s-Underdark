import Character from "./Character"
import { useContext, useState, useEffect } from "react"
import { CharacterContext, EnemyContext, CharacterState, DungeonEnemyContext } from '../context/userContext'
import BattleLog from "./BattleLog";
import Enemy from "./Enemy";
import BattleController from "./Controllers/BattleController";
import AbilityController from "./Controllers/AbilityController";
import { useNavigate } from "react-router-dom";
import BattleOver from './BattleOver'
import Status from "./Controllers/StatusController";

function Battle({}) {
    // const dummy = {
    //     name: "Target Dummy",
    //     level: 0,
    //     image_url: "https://i.pinimg.com/originals/9d/2d/c1/9d2dc15396be8b54e973c269f033ea6b.jpg",
    //     strength: 100,
    //     agility: 100,
    //     intellect: 100,
    //     vitality: 100,
    //     spirit: 100,
    //     abilities: [{name: "Bump", ability_type: "melee", damage: 1, cooldown: 5, effect:"none", cast: 1, description:"stands there menacingly", uses: 10000, mana: 1}, {name: "dummy", ability_type: "skip", type: "skip", description:"stands there menacingly", uses: 10000, manaCost: 1}]
    // }
    
    const { character, setCharacter } = useContext(CharacterContext)
    const { enemy, setEnemy } = useContext(EnemyContext)
    const { dungeonEnemy, setDungeonEnemy } = useContext(DungeonEnemyContext)
    const navigate = useNavigate()
    const [actions, setActions] = useState([]);
    const status = {stunned: false, snared: false, blind: false, silenced: false, cursed: false}
    const [player, setPlayer] = useState({...character, health: character.vitality * 10 + 90, mana: character.spirit * 10 + 90, status: new Status()});
    const [enemyF, setEnemyF] = useState( enemy ? {...enemy, health: enemy.vitality * 10 + 90, mana: enemy.spirit * 10 + 90, status: new Status()} : null);
    const [battleOver, setBattleOver] = useState({battleOver:false, outCome: "Battle Ongoing"});
    const [battleController, setBattleController] = useState(new BattleController(player, enemyF, setActions, setBattleOver));
    
    // useEffect(() => {
        //     fetch(`/enemies/2`)
        //         .then((res) => {
            //         if(res.ok){
                //             res.json()
                //             .then((obj) => {
                    //                 setEnemy({...obj, health: obj.vitality * 10 + 90, mana: obj.spirit * 10 + 90})
                    //                 setBattleController(new BattleController(player, {...obj, health: obj.vitality * 10 + 90, mana: obj.spirit * 10 + 90}, setActions, setBattleOver))
                    //             })
                    //         }
                    //     })
                    // }, []);
    
                    
    if(!enemy) {
        return(
            <button onClick={() => {navigate("/dungeons")}}>Click to Continue</button>
        )
    }
                    
    return (
        <div className="Battle">
            {/* battleOver.battleOver */}
            { battleOver.battleOver ? <BattleOver battleOver={battleOver} dungeonEnemy={dungeonEnemy}/> :
            <>
                <Character character={player} abilityController={battleController}/>
                <section/>
                <BattleLog actions={actions}/>
                <section/>
                <Enemy enemy={battleController.enemy}/>
            </>
        }
        </div>
    )
}

export default Battle