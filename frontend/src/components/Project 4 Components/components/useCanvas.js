
import { useRef, useEffect } from 'react'

function useCanvas(draw, update, play, gameObjects, scale){
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.width = scale.w
    context.height = scale.h
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      resizeCanvasToDisplaySize(canvas)
      play && update(gameObjects)
      draw(context, frameCount, gameObjects)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return canvasRef
}

function resizeCanvasToDisplaySize(canvas) {
    
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      return true // here you can return some usefull information like delta width and delta height instead of just true
      // this information can be used in the next redraw...
    }

    return false
}

export default useCanvas