import GameObject from "./GameObject"

export function Component(gameObject){
    const deepCopy = JSON.parse(JSON.stringify(gameObject))
    deepCopy.sprite = gameObject.sprite
    return new Controller(deepCopy)
}

export function Shallow(gameObject){
    return new Controller(gameObject)
}

class Controller extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.count = 0
        this.nextObject = false
    }

    movementControls(input) {
        if(input.w){
            this.globalPosition.y += 1
        }else if(input.s){
            this.globalPosition.y -= 1
        }

        if(input.d){
            this.globalPosition.x += 1
        }else if(input.a){
            this.globalPosition.x -= 1
        }
    }

    //updates object each frame
    update(input){
        this.movementControls(input)

        //do not remove
        if(this.nextObject){
            this.nextObject.update()
        }
    }
}