import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { CharacterContext } from "../context/userContext";
import Enemy from "./DungeonEnemy"

function Dungeon({}){
    const navigate = useNavigate()
    const [dungeon, setDungeon] = useState(null);
    const { character } = useContext(CharacterContext)

    useEffect(() => {
        fetch(`/dungeons/${window.location.pathname.split('/')[2]}`)
        .then((res) => {
          if(res.ok){
            res.json()
            .then((dungeonObj) => {
              setDungeon(dungeonObj)
            })
          } else {
            res.json()
            .then(msg => alert(msg.error))
          }
        })
    }, []);

    const handleClick = () => {
      navigate(`/dungeons`)
    }

    if(!dungeon) return <span>Loading</span>

    const dungeonEnemies = dungeon ? dungeon.enemies.map((enemy, index) => <Enemy enemy={enemy} dungeonEnemy={dungeon.dungeon_enemies[index]}/>) : <></>
    const characterProgression = dungeon.progresses.filter(progress => progress.character_id === character.id)

    return (
        <div>
            <h2>{dungeon.name}</h2>
            <p>{dungeon.description}</p>
            <h3>Enemies</h3>
            {dungeonEnemies}
            {characterProgression.length == dungeon.enemies.length ? <button onClick={handleClick}>Dungeon Complete</button> : <button onClick={handleClick}>Back</button>}
        </div>
    )
}

export default Dungeon