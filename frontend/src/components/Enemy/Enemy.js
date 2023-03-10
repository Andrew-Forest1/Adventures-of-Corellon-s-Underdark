import {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { DragContext } from '../context/dragContext';

function Enemy({enemy}){
    const navigate = useNavigate()
    const { setDrag } = useContext(DragContext)

    const handleClick = () => {
      navigate(`${enemy.id}`)
    }

    const handleDrag = (e) => {
        e.preventDefault()
    }

    const handleDragStart = (e) => {
        setDrag(enemy)
    }

    return(
        <div onDrag={handleDrag} onDragStart={handleDragStart} draggable>
            <h1>{enemy.name}</h1>
            <img width={150} src={enemy.image_url} alt={enemy.name}/>
            <button onClick={handleClick}>Select</button>
        </div>
    )
}

export default Enemy