import { useState } from "react"
import GameObject from "../../../Scripts/GameObject";

function NewGameObjectForm({scene, setGameObjects}){
    const [newGameObject, setNewGameObject] = useState({
        xposition: 400,
        yposition: 300,
        rotation: 0,
        xscale: 5,
        yscale: 5,
        shape: 'circle'
    });

    const handleChange = (e) => {
        if(e.target.name !== 'shape'){
            setNewGameObject({...newGameObject, [e.target.name]:e.target.value * 1})
        }else{
            setNewGameObject({...newGameObject, [e.target.name]:e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newGO = {
            scene_id: window.location.pathname.split('/')[2],
            x_pos: newGameObject.xposition,
            y_pos: newGameObject.yposition,
            rotation: newGameObject.rotation,
            w_scale: newGameObject.xscale, 
            h_scale: newGameObject.yscale, 
            shape: newGameObject.shape
        }

        fetch('/game_objects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newGO)
        })
        .then(resp => {
            if (resp.status === 201) {
                resp.json()
                .then(GO => {
                    setGameObjects(current => [...current, new GameObject({x: newGameObject.xposition, y: newGameObject.yposition}, newGameObject.rotation, {w: newGameObject.xscale, h: newGameObject.yscale}, newGameObject.shape, "", GO.id)])
                    setNewGameObject({
                        xposition: 400,
                        yposition: 300,
                        rotation: 0,
                        xscale: 5,
                        yscale: 5,
                        shape: 'circle'
                    })
                })
            } else {
                resp.json()
                .then(msg => alert(msg.error))
            }
        })
    }

    return(
        <div >
            <form className="gameObjectForm" onSubmit={handleSubmit}>
                <label htmlFor="xposition">X-Position</label>
                <input onChange={handleChange} value={newGameObject.xposition} type="number" name="xposition"/>
                <label htmlFor="yposition">Y-Position</label>
                <input onChange={handleChange} value={newGameObject.yposition} type="number" name="yposition"/>
                <label htmlFor="rotation">Rotation</label>
                <input onChange={handleChange} value={newGameObject.rotation} type="number" name="rotation"/>
                <label htmlFor="xscale">X-Scale</label>
                <input onChange={handleChange} value={newGameObject.xscale} type="number" name="xscale"/>
                <label htmlFor="yscale">Y-Scale</label>
                <input onChange={handleChange} value={newGameObject.yscale} type="number" name="yscale"/>
                <label htmlFor="shape">Shape</label>
                <input onChange={handleChange} value={newGameObject.shape} type="text" name="shape"/>
                <br/>
                <button type="submit">Create New Object</button>
            </form>
        </div>
    )
}

export default NewGameObjectForm