import { useEffect, useState } from 'react'
import Ability from './Ability';

function Abilities({}){
    const [abilities, setAbilities] = useState([]);
    useEffect(() => {
        fetch("/abilities")
        .then((res) => {
          if(res.ok){
            res.json()
            .then((abilities) => {
              setAbilities(abilities)
            })
          }else{
            res.json()
            .then(msg => alert(msg.error))
          }
        })
    }, []);

    const displayAbilities = abilities.map(ability => {
        return <Ability ability={ability} key={ability.name}/>
    })

    return(
      <div className='abilities'>
        <h1>Abilities</h1>
        {displayAbilities}
      </div>
    )
}

export default Abilities