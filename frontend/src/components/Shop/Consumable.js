import { useContext } from "react"
import { CharacterContext } from '../context/userContext'

function Consumable({consumable}){
    const {character, setCharacter} = useContext(CharacterContext)
    const price = 2

    const handleClick = () => {
        if(character.gold >= price){
            fetch(`/characters/${character.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({gold: character.gold - price})
            })
            .then((res) => {
                if(res.ok){
                    fetch(`/character_consumables`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({consumable_id: consumable.id, character_id: character.id})
                    })
                    .then((res) => {
                        if(res.ok){
                            res.json()
                            .then((character) => {
                                setCharacter(character)
                            })
                        }else{
                            res.json()
                            .then(msg => alert(msg.error))
                        }
                    })
                }else{
                    res.json()
                    .then(msg => alert(msg.error))
                }
            })
        }else{
            alert("not enough gold")
        }
    }

    return (
        <div>
            {consumable.name}
            <p>Price : 2 gold</p>
            <button onClick={handleClick}>Buy</button>
        </div>
    )
}

export default Consumable