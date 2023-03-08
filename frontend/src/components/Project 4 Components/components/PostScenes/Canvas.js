import React from 'react'
import useCanvas from '../useCanvas'
import GameObject from '../../Scripts/GameObject'
import { useState } from 'react'
import { drawTriangle, drawRectangle, drawCircle, positionToCanvas, drawOutline } from '../../Scripts/DrawingFunctions'

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

    //ctx.canvs.width = 500

    const update = (gameObjects) => {
        if(play){
            //debugger
            gameObjects.forEach(object => object.update(input))
        }
    }

    const { options, ...rest } = props
    const { context, ...moreConfig } = options
    const canvasRef = useCanvas(draw, update, play,  !play ? gameObjects : playableObjects, canvasScale)
  
    return <canvas onkey tabIndex={play ? 1 : 0} className='myCanvas' ref={canvasRef} {...rest}/>
}

export default Canvas