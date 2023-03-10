class Status{
    constructor(){
        this.stunned = 0
        this.snared = 0
        this.blind = 0
        this.silenced = 0
        this.cursed = 0
    }
    
    update(){
        if(this.stunned > 0){
            this.stunned -= 1
        }
    }

    isStunned(){
        return this.stunned > 0
    }

    isSnared(){
        return this.snared > 0
    }

    isBlind(){
        return this.blind > 0
    }

    isSilenced(){
        return this.silenced > 0
    }

    isCursed(){
        return this.cursed > 0
    }

    applyEffect(effect, duration){
        switch (effect) {
            case 'stun':
                this.stunned = duration
                break;

            case 'snare':
                this.snared = duration
                break;

            case 'blind':
                this.blind = duration
                break;

            case 'silence':
                this.silenced = duration
                break;
            
            case 'curse':
                this.cursed = duration
                break;

            default:
                break;
        }
    }
}

export default Status