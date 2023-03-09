import { useNavigate } from "react-router-dom"
import { useState } from "react";

function CreateDungeon({}) {
    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "",
        description: "",
        min_level: 1,
        max_level:2
    });

    const handleChange = (e) => {
        setInput(current => {return {...current, [e.target.name]:e.target.value}})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/dungeons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        .then(res => {
            if(res.ok){
                res.json()
                .then(dungeon => navigate(`/editdungeon/${dungeon.id}`))
            }else{
                res.json()
                .then(msg => alert(msg.error))
            }
        })
    }

    return(
        <form onSubmit={handleSubmit} className="dungeonForm"> 
            <label>Dungeon Name</label>
            <input type='text' placeholder="Dungeon Name" name="name" value={input.name} onChange={handleChange}/>
            <label>Dungeon Description</label>
            <input type='text' placeholder="Description" name="description" value={input.description} onChange={handleChange}/>
            <label>Minimum Level</label>
            <input type='number' placeholder="1" name="min_level" value={input.min_level} onChange={handleChange}/>
            <label>Max Level</label>
            <input type='number' placeholder="2" name="max_level" value={input.max_level} onChange={handleChange}/>
            <button type='submit'>Create Dungeon</button>
        </form>
    )
}

export default CreateDungeon