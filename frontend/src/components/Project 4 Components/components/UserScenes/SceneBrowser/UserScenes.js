import UserScene from './UserScene'
import { useState } from 'react'

function UserScenes({scenes, setScenes, setRenderScene, user}){
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
        .then(res =>  {
            if(res.status === 201){
                res.json()
                .then(post => {
                    setScenes(current => {
                        return[post, ...current]
                    })
                })
            }else{
                res.json()
                .then(error => alert(error.error))
            }
        })
        .catch((error) => {
            console.log(error)
        })
        setNewScene({
            user_id: user.id,
            name: ''
        })
    }

    const onChange = (e) => {
        setNewScene(current => {return {...current, name:e.target.value}})
    }

    const displayScenes = scenes.map(scene => {
        return (
            <UserScene scene={scene} setScenes={setScenes} setRenderScene={setRenderScene} key={`Scene-${scene.id}`}/>
        )
    })

    return (
        <div>
            <div className='ScenesContainer'>
                {displayScenes}
            </div>
            <input type="text" onChange={onChange} value={newScene.name}/>
            <button onClick={onClick}>Create New Scene</button>
        </div>
    )
}

export default UserScenes