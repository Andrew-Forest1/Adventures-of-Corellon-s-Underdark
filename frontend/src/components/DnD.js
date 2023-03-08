import { useState } from "react";

function DnD({}){
    const [response, setResponse] = useState(null);

    const handleClick = (str) => {
        fetch("/dnd", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({route: str})
        })
        .then((res) => {
          if(res.ok){
            res.json()
            .then((resp) => {
              setResponse(resp)
            })
          }
        })
    }

    const handleClick2 = (str) => {
        fetch("/dnd", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({route: str})
        })
        .then((res) => {
          if(res.ok){
            res.json()
            .then((resp) => {
              console.log(resp)
            })
          }
        })
    }

    const displayAPIresults = response ? response.results.map(res => <button onClick={() => {handleClick2(res.url)}}>{res.name}</button>) : null

    return(
        <div>
            <button onClick={() => {handleClick('monsters')}}>Monsters</button>
            <button onClick={() => {handleClick('equipment')}}>Equipment</button>
            <button onClick={() => {handleClick('races')}}>Races</button>
            <button onClick={() => {handleClick('spells')}}>Spells</button>
            <div>
                {displayAPIresults ? displayAPIresults : null}
            </div>
        </div>
    )
}

export default DnD