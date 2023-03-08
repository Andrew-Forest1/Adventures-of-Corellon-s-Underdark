import { useState } from "react";

function SkipAbility({abilityController}){
    const [hide, setHide] = useState(true);
    const ability = {
        name: "skip",
        type: "skip",
        ability_type: "skip",
        description: "skipped turn",
        damage: 0,
    }

    const handleClick = () => {
        abilityController.main(ability)
    }

    return(
        <button onClick={handleClick}>
            <h3>Skip Turn</h3>
        </button>
    )
}

export default SkipAbility