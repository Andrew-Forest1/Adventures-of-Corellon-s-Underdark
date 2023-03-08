import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { CharacterContext } from "../context/userContext";
import Enemy from "./DungeonEnemy"
import Enemies from "../CreateEnemy/Enemies";

function EditDungeon({}){
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
          <div>
            <h2>{dungeon.name}</h2>
            <h3>Enemies</h3>
            {dungeonEnemies}
            <h3>Add Enemies</h3>
            <button onClick={handleClick}>Back</button>
          </div>
          <Enemies/>
        </div>
    )
}

export default EditDungeon