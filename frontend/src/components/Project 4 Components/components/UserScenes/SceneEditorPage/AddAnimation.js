import { useState } from "react";
import Animation from "./Animation";

function AddComponent({gameObject, setSelectedGO, animations}){
    const [open, setOpen] = useState(false);
    const [gameObjectAnimations, setanimations] = useState(gameObject.animations);

    const handleOpen = () => {
      setOpen(!open);
    };

    const displayGameObjectanimations = gameObjectAnimations.map(animation => {
        return (
            <div key={`Animation-${animation.name}`}>
                <label>{animation.name}</label>
            </div>
        )})

    const displayAnimations = animations.map(animation => {
        return(
            <Animation animation={animation} gameObject={gameObject} setOpen={setOpen}/>
        )
    })

    return (
        <div className="dropdown">
            {displayGameObjectanimations}
            <button onClick={handleOpen}>Select Animations</button>
            {open ? (
                <ul className="menu">
                    {displayAnimations}
                </ul>) 
                : null}
        </div>
    )
}

export default AddComponent