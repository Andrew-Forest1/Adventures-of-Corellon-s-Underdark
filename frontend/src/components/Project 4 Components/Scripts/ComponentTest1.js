import GameObject from "./GameObject"

// export function setProto(parent){
//     const component = new Component1()
//     const comp = Object.setPrototypeOf(parent, component)
//     return component
// }

export function assign(parent){
    const component = new Component1(parent)
    const temp = component.update
    const comp = Object.assign(component, parent)
    comp.update = function(){
        temp()
        parent.update()
    }
    return comp
}

export function Component(gameObject){
    const deepCopy = JSON.parse(JSON.stringify(gameObject))
    deepCopy.sprite = gameObject.sprite
    return new Component1(deepCopy)
}

export function Shallow(gameObject){
    return new Component1(gameObject)
}

class Component1 extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.prop1 = "Component 1 prop"
        this.count = 0
        this.nextObject = false
    }

    update(input){
        this.scale.w += Math.sin(this.count)
        this.count += .1
        if(this.nextObject){
            this.nextObject.update()
        }
    }

    // super didn't work because this class is not initialized with an extention, one is given dynamically so super is undifined, even after a parent is given
    // parentUpdate(){ 
    //     super.update()
    // }
}