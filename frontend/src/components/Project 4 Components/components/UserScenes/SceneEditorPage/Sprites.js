import { useState, useEffect } from "react";

function Sprites({setDrag, sprites}){
    
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