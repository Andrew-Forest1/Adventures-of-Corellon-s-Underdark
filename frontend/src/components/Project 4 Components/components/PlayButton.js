import GameObject from "../Scripts/GameObject"

function PlayButton({gameObjects, play, setPlay, setPlayableObjects}){
    const handleClick = async () => {
        if(!play){
            const playObjects = await Promise.allSettled(gameObjects.map( async (gameObject) => {
                if(gameObject.animations.length === 0){
                    const deepCopy = JSON.parse(JSON.stringify(gameObject))
                    return new GameObject(deepCopy.globalPosition, deepCopy.globalRotation, deepCopy.scale, deepCopy.shape, gameObject.sprite)
                }else{
                    let finalGameObject = null
                    for(const animation of gameObject.animations){
                        if(!finalGameObject){
                            const { assign, Component } = await import(`../Scripts/${animation.name}`)
                            finalGameObject = await Component(gameObject)
                        }else{
                            let temp = finalGameObject
                            while(temp.nextObject){
                                temp = temp.nextObject
                            }
                            const { Shallow, Component } = await import(`../Scripts/${animation.name}`)
                            temp.nextObject = await Shallow(finalGameObject)
                            // temp = component
                        }
                    }
                    return finalGameObject
                }
            }))
            //debugger
            const playableObjects = playObjects.map(playObject => playObject.value)
            setPlay(current => !current)
            setPlayableObjects(playableObjects)
        }else{
            setPlay(current => !current)
        }
    }

    return <button onClick={handleClick}>{play ? "Stop" : "Play"}</button>
}

export default PlayButton