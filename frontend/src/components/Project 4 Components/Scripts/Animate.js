import GameObject from "./GameObject"

//for Compiling do not remove
export function Component(gameObject){
    return new FIleNew(JSON.parse(JSON.stringify(gameObject)))
}

//for Compiling do not remove
export function Shallow(gameObject){
    return new FIleNew(gameObject)
}

class FIleNew extends GameObject{
    //do not remove
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.nextObject = false
    }

    // Update is called once per frame do not remove
    update(input){

    }
}