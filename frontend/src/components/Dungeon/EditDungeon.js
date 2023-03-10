import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { CharacterContext } from "../context/userContext";
import Enemy from "./DungeonEnemy"
import Enemies from "../Enemy/Enemies";
import { DragContext } from "../context/dragContext";

function EditDungeon({}){
    const navigate = useNavigate()
    const [dungeon, setDungeon] = useState(null);
    const { character } = useContext(CharacterContext)
    const { drag, setDrag } = useContext(DragContext)

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

    const handleDrop = (e) => {
      e.preventDefault()
      fetch("/dungeon_enemies", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({dungeon_id: dungeon.id, enemy_id: drag.id})
      })
      .then((res) => {
        if(res.ok){
          res.json()
          .then((res) => {
              setDungeon(current => {return {...current, enemies: [...current.enemies, res]}})
          })
        } else {
          res.json()
          .then(msg => alert(msg.error))
        }
      })

      setDrag(null)
    }


    if(!dungeon) return <span>Loading</span>

    const dungeonEnemies = dungeon ? dungeon.enemies.map( (enemy, index) => <Enemy enemy={enemy} dungeon={dungeon} progresses={dungeon.progresses} dungeonEnemy={dungeon.dungeon_enemies[index]} editMode={true} setDungeon={setDungeon}/>) : <></>
    const characterProgression = dungeon.progresses.filter(progress => progress.character_id === character.id)

    return (
        <div>
          <div>
            <h2>{dungeon.name}</h2>
            <h3>Enemies</h3>
            {dungeonEnemies}
            <h3 onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} className="addEnemies">Add Enemies</h3>
            <button onClick={handleClick}>Back</button>
          </div>
          <Enemies/>
        </div>
    )
}

export default EditDungeon