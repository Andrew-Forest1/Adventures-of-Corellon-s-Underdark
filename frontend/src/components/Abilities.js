import { useEffect, useState } from 'react'
import Ability from './Ability';

function Abilities({}){
  const [abilities, setAbilities] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredAbilities = abilities.filter(ability => ability.name.toLowerCase().includes(search.toLowerCase()))

  const displayAbilities = filteredAbilities.map(ability => {
      return <Ability ability={ability} key={ability.name}/>
  })

  return(
    <div className='abilities'>
      <h1>Abilities</h1>
      <input type='text' placeholder='search by ability name' value={search} onChange={handleChange}/>
      {displayAbilities}
    </div>
  )
}

export default Abilities