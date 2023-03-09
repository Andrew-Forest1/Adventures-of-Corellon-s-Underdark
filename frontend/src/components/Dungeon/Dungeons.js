import { useEffect, useState } from 'react'
import Dungeon from './DungeonItem'

function Dungeons({}){
    const [dungeons, setDungeons] = useState([]);

    useEffect(() => {
        fetch("/dungeons")
        .then((res) => {
          if(res.ok){
            res.json()
            .then((dungeons) => {
              setDungeons(dungeons)
            })
          } else {
            res.json()
            .then(msg => alert(msg.error))
          }
        })
    }, []);

    const displayDungeons = dungeons.map(dungeon => <Dungeon dungeon={dungeon}/>)

    return (
        <div>
            {displayDungeons}
        </div>
    )
}

export default Dungeons