class ActionController{
    constructor(player, enemy){
        this.player = player
        this.enemy = enemy
        this.turn = "player"
        this.log = "Battle Started"
    }

    action(ability){
        if(ability.origin === "consumable"){
            this.player.consumables[0].amount -= 1
        }
        else if(ability.type !== "skip"){
            this.reduceAbilityUses(ability)
            this.consumeMana(ability)
        }
        this.doAbilityAction(ability)
        this.turn === "player" ? this.turn = "enemy" : this.turn = "player"
        return this.log
    }

    reduceAbilityUses(ability){
        ability.uses -= 1
    }

    reduceItemAmount(consumable){

    }

    doAbilityAction(ability){
        if(ability.type === "support"){
            const target = this.turn === "player" ? this.player : this.enemy
            this.applySupportEffect(ability, target)
        }else if(ability.type === "skip"){
            const target = this.turn === "player" ? this.player : this.enemy
            this.log = {combatent: this.turn ,action : `${target.name} ${ability.description}`}
        }else{
            const target = this.turn === "player" ? this.enemy : this.player
            const attacker = this.turn !== "player" ? this.enemy : this.player
            this.applyDamage(ability, target, attacker)
            this.applyEffect(ability, target)
        }
    }

    consumeMana(ability){
        if(ability.manaCost){
            const target = this.turn === "player" ? this.player : this.enemy 
            target.mana -= ability.manaCost
        }
    }

    applyEffect(ability, target){
        target.status.applyEffect(ability.effect, ability.duration)
    }

    applySupportEffect(ability, target){
        if(ability.effect === "heal"){
            target.health - ability.damage > target.vitality * 10 + 90 ? target.health  = target.vitality * 10 + 90 : target.health -= ability.damage 
            this.log = {combatent: this.turn ,action : `${target.name} used ${ability.name} to heal themselves by ${-1 * ability.damage}`}
        }else if(ability.effect === "mana"){
            target.mana + ability.damage > target.spirit * 10 + 90 ? target.mana  = target.spirit * 10 + 90 : target.mana += ability.damage 
            this.log = {combatent: this.turn ,action : `${target.name} used ${ability.name} to restor mana by ${ability.damage}`}
        }
    }

    applyDamage(ability, target, attacker){
        let damage = ability.damage

        switch (ability.type) {
            case 'melee':
                damage = Math.floor(damage *  (attacker.strength < 2 ? 1 : attacker.strength / 2))
                break;
            case 'range':
                damage = Math.floor(damage * (attacker.agility < 2 ? 1 :attacker.agility / 2))
                break;
            case 'spell':
                damage = Math.floor(damage * (attacker.intellect < 2 ? 1 :attacker.intellect / 2))
                break;
            case 'support':
                damage = damage 
                break;
            default:
                break;
        }
        damage = damage - target.vitality
        damage > 0 ? target.health -= damage : damage = 0
        this.log = {combatent: this.turn ,action : `${attacker.name} used ${ability.name} to inflict ${damage} damage on ${target.name}`}
    }
}

export default ActionController