import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DungeonContext } from "../context/userContext"

function Dungeon({dungeon}){
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

    const dungeonEnemies = dungeon.enemies.map(enemy =><> <span>{enemy.name}</span> <br></br> </>)

    return (
        <div>
            <h2>{dungeon.name}</h2>
            <p>Level Range: {dungeon.min_level} - {dungeon.max_level}</p>
            <h3>Enemies</h3>
            {dungeonEnemies}
            <button onClick={handleClick}>select</button>
            <button onClick={handleEdit}>edit</button>
        </div>
    )
}

export default Dungeon