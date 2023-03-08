import GameObject from "./GameObject";

console.log("This is a RigidBody")

class RigidBody extends GameObject{
    test(){
        console.log("This is RigidBody test function")
    }
}

export default RigidBody