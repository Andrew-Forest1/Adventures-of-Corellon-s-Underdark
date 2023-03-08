import { Action } from "@remix-run/router"
import AbilityController from "./AbilityController"

class EnemyController{
    constructor(enemy){
        this.abilityController = new AbilityController(enemy)
        this.abilities = enemy.abilities
        this.index = 0
    }

    main(){
        this.abilityController.playerAction()
    }

    cycle(){
        let index = 0
        let ability = this.abilityController.playerAction(this.abilities[index])
        while(!ability){
            index += 1
            ability = this.abilityController.playerAction(this.abilities[index])
        }
        return ability
    }

    rotation(){
        if(this.index >= this.abilities.length){
            this.index = 0
        }
        const ability = this.abilities[this.index]
        this.index += 1
        return ability
    }
}

export default EnemyController