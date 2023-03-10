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
    const [editDescription, setEditDescription] = useState(false);
    const [newDescription, setNewDescription] = useState("");

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

    const handleUpdate = () => {
      fetch(`/dungeons/${dungeon.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: newDescription})
      })
      .then((res) => {
        if(res.ok){
          res.json()
          .then((res) => {
              setDungeon(res)
              setEditDescription(false)
          })
        } else {
          res.json()
          .then(msg => alert(msg.error))
        }
      })
    }


    if(!dungeon) return <span>Loading</span>

    const dungeonEnemies = dungeon ? dungeon.enemies.map( (enemy, index) => <Enemy enemy={enemy} dungeon={dungeon} progresses={dungeon.progresses} dungeonEnemy={dungeon.dungeon_enemies[index]} editMode={true} setDungeon={setDungeon}/>) : <></>
    const characterProgression = dungeon.progresses.filter(progress => progress.character_id === character.id)

    const editDescriptionDisplay = () => {
      return(
        <>
          <input type='text' placeholder={dungeon.description} value={newDescription} onChange={(e) => {setNewDescription(e.target.value)}}/>
          <button onClick={() => {setEditDescription(current => !current)}}>Cancle</button>
          <button onClick={handleUpdate}>Update</button> 
        </>
      )
    }

    return (
        <div>
          <div>
            <h1>{dungeon.name}</h1>
            {editDescription ? editDescriptionDisplay() : <p>{dungeon.description} <button onClick={() => {setEditDescription(current => !current)}}>Edit</button></p>}
            <h2>Enemies</h2>
            {dungeonEnemies}
            <h3 onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} className="addEnemies">Add Enemies</h3>
            <button onClick={handleClick}>Back</button>
          </div>
          <Enemies/>
        </div>
    )
}

export default EditDungeon