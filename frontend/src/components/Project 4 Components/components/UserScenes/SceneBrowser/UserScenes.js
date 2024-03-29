import UserScene from './UserScene'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../context/userContext';

function UserScenes({}){
    const {user} = useContext(UserContext);
    const [scenes, setScenes] = useState([]);
    const [renderScene, setRenderScene] = useState(null);

    const [newScene, setNewScene] = useState({
        user_id: user.id,
        name: ''
    });

    useEffect(() => {
        getScenes()
    }, []);

    const getScenes = () => {
        fetch("/scenes")
        .then(resp => resp.json())
        .then(data => {
          setScenes(data)
        })
    }
    
    const userScenes = user ? scenes.filter(scene => scene.user.id === user.id) : null

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