import { useState } from "react";

function UseItem({abilityController}){
    const [hide, setHide] = useState(true);
    const ability = {
        name: "skip",
        type: "skip",
        ability_type: "skip",
        description: "skipped turn",
        damage: 0,
    }

    const handleClick = () => {
        //abilityController.main(ability)
    }

    return(
        <button onClick={handleClick}>
            <h3>Items</h3>
        </button>
    )
}

export default UseItem