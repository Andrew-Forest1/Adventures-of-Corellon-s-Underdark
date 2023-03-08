import GameObject from "./GameObject"

export function Component(gameObject){
    const deepCopy = JSON.parse(JSON.stringify(gameObject))
    deepCopy.sprite = gameObject.sprite
    return new Bob(deepCopy)
}

export function Shallow(gameObject){
    return new Bob(gameObject)
}

class Bob extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.nextObject = false
        this.count = 0
    }

    //updates object each frame
    update(input){
        this.globalPosition.y += Math.sin(this.count) * .1
        this.count += .05
        
        //do not remove
        if(this.nextObject){
            this.nextObject.update()
        }
    }
}