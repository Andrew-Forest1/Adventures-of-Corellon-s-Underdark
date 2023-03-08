import { useNavigate } from "react-router-dom"

function CreateDungeon({}) {
    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return(
        <form onSubmit={handleSubmit} className="dungeonForm"> 
            <label>Dungeon Name</label>
            <input type='text' placeholder="Dungeon Name"/>
            <label>Dungeon Name</label>
            <input type='text' placeholder="Description"/>
            <label>Minimum Level</label>
            <input type='number' placeholder="1"/>
            <label>Max Level</label>
            <input type='number' placeholder="2"/>
            <button type='submit'>Create Dungeon</button>
        </form>
    )
}

export default CreateDungeon