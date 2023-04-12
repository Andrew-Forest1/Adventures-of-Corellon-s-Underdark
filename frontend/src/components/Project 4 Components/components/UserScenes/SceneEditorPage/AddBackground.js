import { useState } from "react";

function AddBackground({sprites, background}){
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleClick = (e) => {
        // // const img = new Image(gameObject.scale.x * 10, gameObject.scale.y * 10)
        // const s = sprites.find(sprite => sprite.id == e.target.name)
        // // img.src = s.image_url
        // // img.name = s.name
        // // gameObject.sprite = img
        // // setSelectedGO({...gameObject})
        // // setOpen(!open);
        fetch(`/scenebackground/${window.location.pathname.split('/')[2]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({sprite_id: e.target.name})
        })
    }

    const displayDropDown = sprites.map(sprite => {
        return(
            <li className="menu-item">
                <button onClick={handleClick} name={sprite.id}>{sprite.name}</button>
            </li>
        )
    })

    return (
        <div className="dropdown">
            <button onClick={handleOpen}>{background ? "Background" : "Add Background"}</button>
            {open ? (
                <ul className="menu">
                    {displayDropDown}
                </ul>) 
            : null}
        </div>
    )
}

export default AddBackground