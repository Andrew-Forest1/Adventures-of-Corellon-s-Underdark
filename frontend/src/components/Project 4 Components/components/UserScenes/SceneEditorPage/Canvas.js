import React from 'react'
import useCanvas from '../../useCanvas'
import GameObject from '../../../Scripts/GameObject'
import { useState } from 'react'
import { drawTriangle, drawRectangle, drawCircle, positionToCanvas, drawOutline } from '../../../Scripts/DrawingFunctions'

function Canvas({props, gameObjects, setGameObjects, selectedGO, setSelectedGameObject, play, playableObjects, dragSprite, showOutlines}){  
    //const [canvasRect, setCanvasRect] = useState(document.getElementsByClassName("myCanvas")[0].getBoundingClientRect()); //canvas needs to load first
    const [canvasScale, setCanvasScale] = useState({w: 500, h:500});
    const [drag, setDrag] = useState(false)
    const [input, setInput] = useState({
        key: '',
        type:''
    });

    const draw = (ctx, frameCount, gameObjects) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        gameObjects.forEach(gameObject => {
            if(gameObject.sprite !== ""){
                ctx.translate(gameObject.globalPosition.x, positionToCanvas(gameObject.globalPosition.y)) 
                ctx.rotate(gameObject.globalRotation * Math.PI / 180)
                ctx.translate(-1 * (gameObject.globalPosition.x), -1 * (positionToCanvas(gameObject.globalPosition.y))) 
                ctx.drawImage(gameObject.sprite, gameObject.globalPosition.x - gameObject.scale.w * 5, positionToCanvas(gameObject.globalPosition.y + gameObject.scale.h * 5), gameObject.scale.w * 10, gameObject.scale.h * 10)
                ctx.translate(gameObject.globalPosition.x, positionToCanvas(gameObject.globalPosition.y))
                ctx.rotate(-1 * gameObject.globalRotation * Math.PI / 180)
                ctx.translate(-1 * (gameObject.globalPosition.x), -1 * (positionToCanvas(gameObject.globalPosition.y))) 
                if(showOutlines) {drawOutline(gameObject, ctx)}
            }else{
                if(gameObject.shape === 'triangle'){
                    drawTriangle(gameObject, ctx)
                }else if(gameObject.shape === 'rectangle'){
                    drawRectangle(gameObject, ctx)
                }
                else{
                    drawCircle(gameObject, ctx)
                }
            }
        });
    }

    const handleClick = (e) => {
        const rect = document.getElementsByClassName("myCanvas")[0].getBoundingClientRect()
        const mousePos = {
            x: e.clientX - rect.x,
            y: positionToCanvas(e.clientY - rect.y)
        }

        const selectedGameObjects = gameObjects.filter(gameObject => {
            return gameObject.selectGameObject(mousePos)
        })

        selectedGameObjects.length !== 0 ? setSelectedGameObject(selectedGameObjects[0]) : setSelectedGameObject(null)
    }

    const handleMouseDown = (e) => {
        if(selectedGO && !play){
            setDrag(true)
        }else{

        }
    }

    const handleMouseUp = (e) => {
        if(drag){
            setSelectedGameObject({...selectedGO})
            fetch(`/game_objects/${selectedGO.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({x_pos: selectedGO.globalPosition.x, y_pos:selectedGO.globalPosition.y})
            })
        }
        setDrag(false)
    }

    const handleMouseMove = (e) => {
        if(drag){
            const rect = document.getElementsByClassName("myCanvas")[0].getBoundingClientRect()
            selectedGO.globalPosition = {x: (e.clientX - rect.x) * 1, y: positionToCanvas((e.clientY - rect.y) * 1)}
        }
    }

    const handleController = (e) => {
        //console.log(e)
        setInput({key:e.key, type: e.type})
    }

    //ctx.canvs.width = 500

    const update = (gameObjects) => {
        if(play){
            //debugger
            gameObjects.forEach(object => object.update())
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        //debugger
        const rect = document.getElementsByClassName("myCanvas")[0].getBoundingClientRect()
        const mousePos = {
            x: e.clientX - rect.x,
            y: positionToCanvas(e.clientY - rect.y)
        }
        createNewGameObject(mousePos, dragSprite)
    }

    const createNewGameObject = (mousePos, sprite) => {
        const newGO = {
            scene_id: window.location.pathname.split('/')[2],
            x_pos: mousePos.x,
            y_pos: mousePos.y,
            rotation: 0,
            w_scale: 10, 
            h_scale: 10, 
            shape: "rectangle"
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
                .then(gameObject => {
                    fetch('/game_object_sprites', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({game_object_id: gameObject.id, sprite_id: sprite.id})
                    })
                    .then(res => res.json)
                    .then(data => {
                        const img = new Image(100, 100)
                        img.src = sprite.image_url
                        img.name = sprite.name
                        img.crossOrigin="anonymous"
                        setGameObjects(current => [...current, new GameObject({x: gameObject.x_pos, y: gameObject.y_pos}, gameObject.rotation, {w: gameObject.w_scale, h: gameObject.h_scale}, gameObject.shape, img, gameObject.id)])
                    })
                })
            } else {
                resp.json()
                .then(msg => alert(msg))
            }
        })
    }

    const { options, ...rest } = props
    const { context, ...moreConfig } = options
    const canvasRef = useCanvas(draw, update, play,  !play ? gameObjects : playableObjects, canvasScale)
  
    return <canvas onClick={handleClick} onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onKeyDown={handleController} onKeyUp={handleController} onkey tabIndex={play ? 1 : 0} className='myCanvas' ref={canvasRef} {...rest}/>
}

export default Canvas