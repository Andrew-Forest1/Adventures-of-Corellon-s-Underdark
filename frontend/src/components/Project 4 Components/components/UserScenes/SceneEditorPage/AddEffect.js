import { useState } from "react";
import Animation from "./Animation";

function AddEffect({gameObject, setSelectedGO, setTextEditor, setGameObjects}){
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleClick = (e) => {
        fetch("/interactions",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({game_object_id: gameObject.id, event: e.target.name})
          })
          .then(resp => {
            if (resp.ok) {
              resp.json().then(gameObject => {
                setGameObjects(current => {
                    const sceneId = current.findIndex(ele => ele.id === gameObject.id)
                    return [...current.slice(0, sceneId), gameObject, ...current.slice(sceneId + 1)]
                })
              })
            } else {
              resp.json().then(messageObj => alert(messageObj.error))
            }
        })
        setTextEditor(true)
    }

    return (
        <div className="dropdown">
            <button onClick={handleOpen}>Select On Click Event</button>
            {open ? (
                <ul className="menu">
                    <li><button onClick={handleClick} name="Text">Add Text</button></li>
                    <li><button onClick={handleClick} name="Scene Transition">Go To Scene</button></li>
                    <li><button onClick={handleClick} name="Dungeon Transition">Go To Dungeon</button></li>
                </ul>) 
                : null}
        </div>
    )
}

export default AddEffect