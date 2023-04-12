import Inspector from './Inspector';
import NewGameObjectForm from './NewGameObjectForm';
import PlayButton from '../../PlayButton';
import Canvas from './Canvas'
import React, { useState, useEffect, useContext } from 'react';
import GameObject from '../../../Scripts/GameObject';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/userContext';
import { DragContext } from '../../../../context/dragContext';
import Sprites from './Sprites'
import UploadSprite from '../../UploadSprite'
import AddBackground from './AddBackground';
import { SceneContext } from '../../../../context/sceneContext';

function SceneEditor({}){
    const {user} = useContext(UserContext);
    const {scene, setScene} = useContext(SceneContext);
    const {drag, setDrag} = useContext(DragContext)
    const [gameObjects, setGameObjects] = useState(null);
    const [playableObjects, setPlayableObjects] = useState([]);
    const [selectedGO, setSelectedGO] = useState(null);
    const [play, setPlay] = useState(false);
    const [sprites, setSprites] = useState([]);
    const [showOutlines, setShowOutlines] = useState(false);
    const [animations, setAnimations] = useState([{id:1, name:'Circle'}, {id:2, name:'Bob'}, {id:3, name:'Sway'}, {id:4, name:'Controller'}]);
    const navigate = useNavigate()
    

    const canvasProps = {
        options: {
          width: 600,
          height: 500
        }
    }

    const [state, setState] = useState(scene ? {
        id: scene.id,
        image: scene.background,
    } : {
        id: null,
        image: null,
    });

    //console.log(window.location.pathname)

    useEffect(() => {
        fetch(`/scenes/${window.location.pathname.split('/')[2]}`)
        .then(resp => resp.json())
        .then(data => {
            // if(data.user.id === 1){
            getGameObjects(data)
            // }else{
            //     navigate(-1)
            // }  
        })
    }, []);

    useEffect(() => {
        fetch(`/sprites`)
        .then(resp => resp.json())
        .then(data => { 
            const userSprites = data.filter(sprite => sprite.user.id === user.id)
            setSprites(userSprites)
        })
    }, []);

    const getGameObjects = (gameObjects) => {
        const newGameObjects = gameObjects.map(gameObject => {
            let img = new Image()
            if(gameObject.sprite !== null){
                img.src = gameObject.sprite.image_url
                img.name = gameObject.sprite.name
                //img.crossOrigin="anonymous"
            }
            const go = new GameObject({x: gameObject.x_pos, y: gameObject.y_pos}, gameObject.rotation, {w: gameObject.w_scale, h: gameObject.h_scale}, gameObject.shape, img, gameObject.id, gameObject.interaction)
            go.animations = gameObject.animations
            return go
        })
        setGameObjects(newGameObjects)
    }

    const handleSave = (e) => {
        const canvas = document.getElementsByClassName('myCanvas')[0]
        const newImage = {image: canvas.toDataURL()}
        fetch(`${window.location.pathname}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newImage)
        })
        .then(resp => resp.json())
    }

    const onImageChange = (e) => { 
        setState(current => {return {...current, image: e.target.files[0] }});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', state.image);
        formData.append('id', state.id);

        fetch(`/scenebackground/${scene.id}`, {
          method: 'PUT',
          body: formData
        })
        .then((res) => {
            if(res.ok){
                res.json()
                .then((scene) => {
                    setScene({...scene})
                })
            }else{
                res.json()
                .then(msg => alert(msg.error))
              }
        })
    }

    if(!gameObjects) return (<label>Loading</label>)

    return (
        <>
        <div className='editor'>
            <div>
                <NewGameObjectForm setGameObjects={setGameObjects}/>
                <button onClick={() => {setShowOutlines(current => !current)}}>{showOutlines ? "Hide Outlines" : "Show Outlines"}</button>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" multiple={false} onChange={onImageChange}/>
                    <button type="submit">Upload</button>
                </form>
            </div>
            <Canvas props={canvasProps} gameObjects={gameObjects} setGameObjects={setGameObjects} selectedGO={selectedGO} setSelectedGameObject={setSelectedGO} play={play} playableObjects={playableObjects} dragSprite={drag} showOutlines={showOutlines}/>
            <PlayButton gameObjects={gameObjects} play={play} setPlay={setPlay} setPlayableObjects={setPlayableObjects}/>
            <button onClick={handleSave}>Save</button>
            {selectedGO ? <Inspector gameObject={selectedGO} setSelectedGO={setSelectedGO} setGameObjects={setGameObjects} animations={animations} sprites={sprites}/> : null}
        </div>
            <>
                <UploadSprite user={user} setSprites={setSprites}/>
                <Sprites setDrag={setDrag} sprites={sprites}/>
            </>
        </>
    )
}

export default SceneEditor