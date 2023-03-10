class ActionController{
    constructor(player, enemy){
        this.player = player
        this.enemy = enemy
        this.turn = "player"
        this.log = "Battle Started"
    }

    action(ability){
        if(ability.type !== "skip"){
            this.reduceAbilityUses(ability)
            this.doAbilityAction(ability)
            this.consumeMana(ability)
        }else{
            this.doAbilityAction(ability)
        }
        this.turn === "player" ? this.turn = "enemy" : this.turn = "player"
        return this.log
    }

    reduceAbilityUses(ability){
        ability.uses -= 1
    }

    doAbilityAction(ability){
        if(ability.type === "support"){
            const target = this.turn === "player" ? this.player : this.enemy
            target.health - ability.damage > target.vitality * 10 + 90 ? target.health  = target.vitality * 10 + 90 : target.health -= ability.damage 
            this.log = {combatent: this.turn ,action : `${target.name} used ${ability.name} to heal themselves by ${-1 * ability.damage}`}
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
        const target = this.turn === "player" ? this.player : this.enemy 
        target.mana -= ability.manaCost
    }

    applyEffect(ability, target){
        target.status.applyEffect(ability.effect, ability.duration)
    }

    applyDamage(ability, target, attacker){
        let damage = ability.damage

        switch (ability.type) {
            case 'melee':
                damage = damage * attacker.strength / 2
                break;
            case 'range':
                damage = damage * attacker.agility / 2
                break;
            case 'spell':
                damage = damage * attacker.intellect / 2
                break;
            case 'support':
                damage = damage * attacker.strength / 2
                break;
            default:
                break;
        }
        damage -= target.vitality
        damage > 0 ? target.health -= damage : damage = 0
        this.log = {combatent: this.turn ,action : `${attacker.name} used ${ability.name} to inflict ${damage} damage on ${target.name}`}
    }
}

export default ActionController