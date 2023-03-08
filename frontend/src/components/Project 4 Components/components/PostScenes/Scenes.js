import Scene from './Scene'
import { useState } from 'react'

function Scenes({scenes, setScenes, setRenderScene, user}){
    const [newScene, setNewScene] = useState({
        user_id: user.id,
        name: ''
    });

    const onClick = (e) => {
        fetch('/scenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newScene)
        })
        .then(res => res.json())
        .then(post => {
            setScenes(current => {
                return[post, ...current]
            })
        })
        .catch((error) => {
            console.log(error)
        })
        setNewScene({
            user_id: 1,
            name: ''
        })
    }

    const onChange = (e) => {
        setNewScene(current => {return {...current, name:e.target.value}})
    }

    const displayScenes = scenes.map(scene => {
        return (
            <Scene scene={scene} setScenes={setScenes} setRenderScene={setRenderScene} key={`Scene-${scene.id}`}/>
        )
    })

    return (
        <div className='ScenesContainer'>
            {displayScenes}
        </div>
    )
}

export default Scenes