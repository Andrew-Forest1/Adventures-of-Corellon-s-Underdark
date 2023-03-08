class GameObject{
    constructor(position, rotation, scale, shape, sprite, id){
        this.localPosition = position
        this.globalPosition = position
        this.localRotation = rotation
        this.globalRotation = rotation
        this.scale = scale
        this.selected = false
        this.animations = []
        this.sprite = sprite
        this.shape = shape
        this.id = id
        //console.log(this)
    }

    selectGameObject(mousePosition) {
        if(this.shape === 'circle'){
            return this.detectCircle(mousePosition)
        }else if(this.shape === 'rectangle'){
            return this.detectRectangle(mousePosition)
        }else{
            return this.detectCircle(mousePosition)
        }
    }

    distance(pos1, pos2){
        return Math.sqrt(Math.pow((pos1.x - pos2.x),2) + Math.pow((pos1.y - pos2.y),2))
    }

    detectCircle(mousePosition){
        return (this.distance(this.globalPosition, mousePosition) < this.scale.w * 5)
    }

    detectRectangle(mousePosition){
        return (Math.abs(this.globalPosition.x - mousePosition.x) < this.scale.w * 5 && Math.abs(this.globalPosition.y - mousePosition.y) < this.scale.h * 5) 
    }

    runComponents(){

    }

    update(input){

    }
}

export default GameObject