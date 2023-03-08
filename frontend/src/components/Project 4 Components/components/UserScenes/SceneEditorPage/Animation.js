function Animation({animation, gameObject, setOpen}){
    const handleClick = (e) => {
        fetch('/game_object_animations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({game_object_id: gameObject.id, animation_id: animation.id})
        })
        .then(res => res.json())
        .then(gameObject.animations.push(animation))
        setOpen(current => !current)
    }

    return(
        <li className="menu-item">
            <button onClick={handleClick} name={animation.id}>{animation.name}</button>
        </li>
    )
}

export default Animation