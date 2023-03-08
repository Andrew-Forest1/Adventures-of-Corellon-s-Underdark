import GameObject from "./GameObject"

export function Component(gameObject){
    const deepCopy = JSON.parse(JSON.stringify(gameObject))
    deepCopy.sprite = gameObject.sprite
    return new Sway(deepCopy)
}

export function Shallow(gameObject){
    return new Sway(gameObject)
}

class Sway extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.nextObject = false
        this.count = 0
    }

    //updates object each frame
    update(input){
        this.globalPosition.x += Math.sin(this.count) * .1
        this.count += .05
        
        //do not remove
        if(this.nextObject){
            this.nextObject.update()
        }
    }
}