import { useState, useEffect } from "react";

function Sprites({setDrag, user}){
    const [sprites, setSprites] = useState([]);

    useEffect(() => {
        fetch(`/sprites`)
        .then(resp => resp.json())
        .then(data => { 
            
            const userSprites = data.filter(sprite => sprite.user.id === user.id)
            setSprites(userSprites)
        })
    }, []);
    
    const displaySprites = sprites.map(sprite => {
        return <img src={sprite.image_url} alt={sprite.name} onDragStart={() => {setDrag(sprite)}}/> 
    })

    return (
        <div>
            {displaySprites}
        </div>
    )
}

export default Sprites