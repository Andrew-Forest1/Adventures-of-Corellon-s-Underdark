import {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";

function Enemy({enemy}){
    const navigate = useNavigate()

    const handleClick = () => {
      navigate(`${enemy.id}`)
    }

    return(
        <div>
            <h1>{enemy.name}</h1>
            <img width={150} src={enemy.image_url} alt={enemy.name}/>
            <button onClick={handleClick}>Select</button>
        </div>
    )
}

export default Enemy