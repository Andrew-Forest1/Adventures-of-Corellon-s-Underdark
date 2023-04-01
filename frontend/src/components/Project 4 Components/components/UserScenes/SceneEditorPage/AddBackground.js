import { useState } from "react";

function AddBackground({gameObject, setSelectedGO, sprites}){
    const [open, setOpen] = useState(false);
    const [components, setComponents] = useState(gameObject.components);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleClick = (e) => {
        // const img = new Image(gameObject.scale.x * 10, gameObject.scale.y * 10)
        const s = sprites.find(sprite => sprite.id == e.target.name)
        // img.src = s.image_url
        // img.name = s.name
        // gameObject.sprite = img
        // setSelectedGO({...gameObject})
        // setOpen(!open);
        fetch('/scenes/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({sprite_id: s.id})
        })
    }

    const displayDropDown = sprites.map(script => {
        return(
            <li className="menu-item">
                <button onClick={handleClick} name={script.id}>{script.name}</button>
            </li>
        )
    })

    return (
        <div className="dropdown">
            <button onClick={handleOpen}>{gameObject.sprite === "" ? "Add Sprite" : gameObject.sprite.name}</button>
            {open ? (
                <ul className="menu">
                    {displayDropDown}
                </ul>) 
            : null}
        </div>
    )
}

export default AddBackground