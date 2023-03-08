import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { CharacterContext } from "../context/userContext";
import Enemy from "./DungeonEnemy"

function Dungeon({}){
    const navigate = useNavigate()
    const [dungeon, setDungeon] = useState(null);
    const { character } = useContext(CharacterContext)

    useEffect(() => {
        fetch(`/dungeons/1`)
        .then((res) => {
          if(res.ok){
            res.json()
            .then((dungeonObj) => {
              setDungeon(dungeonObj)
            })
          } else {
            res.json()
            .then(msg => alert(msg))
          }
        })
    }, []);

    const handleClick = () => {
      navigate(`/dungeons`)
    }

    if(!dungeon) return <span>Loading</span>

    const dungeonEnemies = dungeon ? dungeon.enemies.map(enemy => <Enemy enemy={enemy} progresses={dungeon.progresses}/>) : <></>
    const characterProgression = dungeon.progresses.filter(progress => progress.character_id === character.id)

    return (
        <div>
            <h2>{dungeon.name}</h2>
            <h3>Enemies</h3>
            <p>{dungeon.description}</p>
            {dungeonEnemies}
            {characterProgression.length == dungeon.enemies.length ? <button onClick={handleClick}>Dungeon Complete</button> : <button onClick={handleClick}>Back</button>}
        </div>
    )
}

export default Dungeon