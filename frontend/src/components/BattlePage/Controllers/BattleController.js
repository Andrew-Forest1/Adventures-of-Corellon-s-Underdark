import AbilityController from "./AbilityController"
import ActionController from "./ActionController"
import EnemyController from "./EnemyController"
import Status from "./StatusController"

class BattleController{
    constructor(player, enemy, setActions, setBattleOver){
        this.player = player
        this.enemy = enemy
        if(enemy){
            this.abilityController = new AbilityController(player)
            this.actionController = new ActionController(player, enemy)
            this.enemyController = new EnemyController(enemy)
            this.setActions = setActions
            this.setBattleOver = setBattleOver
        }
        console.log("battle controller init")
    }

    main(ability){
        if(this.playerAlive()){
            const a = this.abilityController.playerAction(ability)
            if(a){
                this.logAction(this.actionController.action(a))
                if(this.enemyAlive()){
                    const ab = this.enemyController.cycle()
                    this.logAction(this.actionController.action(ab))
                }else{
                    this.setBattleOver({battleOver: true, outCome: "player"})
                }
            }else{
                //console.log(this.abilityController.error)
            }
        }else{
            this.setBattleOver({battleOver: true, outCome: "enemy"})
        }
    }

    playerAlive(){
        return this.player.health > 0
    }

    enemyAlive(){
        return this.enemy.health > 0
    }

    logAction(action){
        this.setActions(current => [...current, action])
    }
}

export default BattleController