class AbilityController{
    constructor(player){
        this.playerAbilities = player.abilities.map(ability => {
            const a = {
                name: ability.name,
                type: ability.ability_type,
                damage: ability.damage,
                cooldownDuration: ability.cooldown,
                cooldownCounter: 0,
                uses: ability.uses,
                maxUses: ability.uses,
                manaCost: ability.mana,
                castTime: ability.cast,
                castingCounter: ability.cast,
                effect: ability.effect,
                duration: ability.duration
            }
            return a
        })
        this.casting = null
        this.player = player
        this.error = "none"
    }

    playerAction(ability){
        if(this.playerStunned() || ability.ability_type === "skip"){
            this.cooldownCountDown()
            this.player.status.update()
            this.casting = null
            return ability.ability_type === "skip" ? ability : this.error
        }else{
            const abilityInvoked = this.playerAbilities.find(ab => ab.name === ability.name)
            if(this.canInvoke(abilityInvoked)){
                if(this.playerCasting() && abilityInvoked === this.casting){
                    if(this.castingDone()){
                        this.casting = null
                        this.cooldownCountDown()
                        abilityInvoked.cooldownCounter = abilityInvoked.cooldownDuration
                        return abilityInvoked
                    }else{
                        this.cooldownCountDown()
                        this.updateCasting(ability)
                        this.player.status.update()
                        return {
                            name: "skip",
                            type: "skip",
                            ability_type: "skip",
                            description: `casting ${this.casting.name}, ready ${this.casting.castingCounter === 1 ? "next turn" : `in ${this.casting.castingCounter - 1} turn(s)`}`,
                            damage: 0,
                        }
                    }
                }else if(this.playerCasting()){
                    this.casting = null
                }

                this.cooldownCountDown()
                this.player.status.update()
                if(this.isInstant(abilityInvoked)){
                    abilityInvoked.cooldownCounter = abilityInvoked.cooldownDuration
                    return abilityInvoked
                }else{
                    this.startCasting(abilityInvoked)
                    return {
                        name: "skip",
                        type: "skip",
                        ability_type: "skip",
                        description: `started casting ${this.casting.name}, ready ${this.casting.castingCounter === 1 ? "next turn" : `in ${this.casting.castingCounter - 1} turn(s)`}`,
                        damage: 0,
                    }
                }
            }else{
                return null
            }
        }
    }

    playerStunned(){
        this.error = {type: "skip", description: `${this.player.name} is stunned`}
        return this.player.status.isStunned()
    }

    playerSnared(){
        return this.player.status.snared
    }

    playerBlind(){
        return this.player.status.blind
    }

    playerSilenced(){
        return this.player.status.silenced
    }

    playerCursed(){
        return this.player.status.cursed
    }

    playerCasting(){
        return !!this.casting
    }

    canInvoke(ability){
        if(ability.cooldownCounter == 0 && ability.uses > 0 && ability.manaCost <= this.player.mana){
            return true
        }else{
            if(ability.cooldownCounter > 0){
                this.error = "Ability on Cooldown"
            }else{
                this.error = "Ability Depleted"
            }
            return false
        }
    }

    updateCasting(){
        this.casting.castingCounter -= 1
    }

    castingDone(){
        if(this.casting.castingCounter === 1){
            return true
        }else{
            return false
        }
    }

    isInstant(ability){
        return ability.castTime === 0 ? true : false
    }

    startCasting(ability){
        this.casting = ability
    }

    cooldownCountDown(){
        this.playerAbilities.forEach(ability => {
            if(ability.cooldownCounter > 0) {
                ability.cooldownCounter = ability.cooldownCounter - 1
            }
            return ability
        });
    }
}

export default AbilityController