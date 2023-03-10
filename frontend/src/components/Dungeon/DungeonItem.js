import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DungeonContext } from "../context/userContext"

function Dungeon({dungeon, setDungeons}){
    const navigate = useNavigate()
    const { setDungeon } = useContext(DungeonContext)

    const handleClick = () => {
        setDungeon(dungeon)
        navigate(`${dungeon.id}`)
    }

    const handleEdit = () => {
        setDungeon(dungeon)
        navigate(`/editdungeon/${dungeon.id}`)
    }

    const handleDelete = () => {
        fetch(`/dungeons/${dungeon.id}`,{
          method: "DELETE"
        })
        .then(resp => {
          if (resp.ok) {
              setDungeons(current => {
                const dungeonId = current.findIndex(ele => ele.id === dungeon.id)
                return [...current.slice(0, dungeonId), ...current.slice(dungeonId + 1)]
            })
          } else {
            resp.json().then(messageObj => alert(messageObj.error))
          }
        })
      }

    const dungeonEnemies = dungeon.enemies.map(enemy =><> <span>{enemy.name}</span> <br></br> </>)

    return (
        <div>
            <h2>{dungeon.name}</h2>
            <p>Level Range: {dungeon.min_level} - {dungeon.max_level}</p>
            <h3>Enemies</h3>
            {dungeonEnemies}
            <button onClick={handleClick}>select</button>
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Dungeon