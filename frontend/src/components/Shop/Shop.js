import { useState, useEffect } from "react";
import Consumable from "./Consumable";
import Inventory from "./Inventory";

function Shop(){
    const [consumables, setConsumables] = useState([]);

    useEffect(() => {
        fetch('/consumables')
        .then(res => {
            if(res.ok){
                res.json()
                .then(consumables => {
                    setConsumables(consumables)
                })
            }else{
                res.json()
                .then(msg => alert(msg.error))
            }
        })
    }, []);

    const displayConsumables = consumables.map(consumable => <Consumable consumable={consumable}/>)

    return (
        <div>
            <div>
                <h2>Consumables</h2>
                <ul>
                    {displayConsumables}
                </ul>
            </div>
            <div>
                <Inventory/>
            </div>
        </div>
    )
}

export default Shop