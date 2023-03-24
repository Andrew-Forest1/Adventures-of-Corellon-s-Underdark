import { useState } from "react";

function UseItem({setShowItems}){

    const handleClick = () => {
        setShowItems(current => !current)
    }

    return(
        <button onClick={handleClick}>
            <h3>Items</h3>
        </button>
    )
}

export default UseItem