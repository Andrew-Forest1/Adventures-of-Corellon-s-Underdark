import {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Abilities from '../Abilities';
import EnemyAbilities from './EnemyAbilities';

function Enemy({}){
    const [enemy, setEnemy] = useState(null)
    const navigate = useNavigate()

    const [state, setState] = useState(enemy ? {
        id: enemy.id,
        image: enemy.image_url,
    } : {
        id: null,
        image: null,
    });

    useEffect(() => {
        fetch(`/enemies/${window.location.href.split('/')[4]}`)
            .then((res) => {
            if(res.ok){
                res.json()
                .then((enemy) => {
                    setEnemy({...enemy})
                    setState({
                        id: enemy.id,
                        image: enemy.image_url
                    })
                })
            }else{
                res.json()
                .then(msg => alert(msg.error))
            }
        })
    }, []);

    const handleAdd = (e) => {
        enemy[e.target.name] += 1
        setEnemy({...enemy})
    }

    const handleSubtract = (e) => {
        if(enemy[e.target.name] - 1 > 0){
            enemy[e.target.name] -= 1
            setEnemy({...enemy})
        }
    }

    const handleChange = (e) => {
        setEnemy(current => {return {...current, experience: e.target.value}})
    }

    const handleSave = () => {
        fetch(`/enemies/${window.location.href.split('/')[4]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(enemy)
        })
        .then((res) => {
            if(res.ok){
                res.json()
                .then((enemy) => {
                    setEnemy(enemy)
                    alert("enemy saved")
                })
            }{
                res.json()
                .then(msg => alert(msg.error))
              }
        })
    }

    const onImageChange = (e) => { 
        setState(current => {return {...current, image: e.target.files[0] }});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', state.image);
        formData.append('id', state.id);

        fetch('/enemyimage', {
          method: 'PUT',
          body: formData
        })
        .then((res) => {
            if(res.ok){
                res.json()
                .then((enemy) => {
                    setEnemy({...enemy})
                })
            }{
                res.json()
                .then(msg => alert(msg.error))
              }
        })
    }

    const handleDrop = (e) => {
        e.preventDefault()
        if(e.dataTransfer.getData('URL')){
            console.log(e.dataTransfer.getData('URL'))
            setState(current => {return {...current, image: e.dataTransfer.getData('URL') }})
            console.log(state)
            const formData = new FormData();
            formData.append('image', e.dataTransfer.getData('URL'));
            formData.append('id', state.id);
    
            fetch('/enemyimage', {
              method: 'PUT',
              body: formData
            })
            .then((res) => {
                if(res.ok){
                    res.json()
                    .then((enemy) => {
                        setEnemy({...enemy})
                    })
                }else {
                    res.json()
                    .then(msg => alert(msg.error))
                  }
            })
        }
    }

    if(!enemy) return <h1>Loading</h1>

    const img = new Image()
    img.src = enemy.image_url
    const imgCSS = img.naturalWidth > img.naturalHeight ? 'imageWidth' : 'imageHeight'

    return(
        <div className='editCharacter'>
            <div className='editCharacterStats'>
                <h1>{enemy.name} Level: {enemy.level}</h1>
                {enemy.image_url ? <img className={imgCSS} onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} src={enemy.image_url}/> : <p onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}>Add Image</p>}
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" multiple={false} onChange={onImageChange}/>
                    <button type="submit">Upload</button>
                </form>
                <div>
                    <label>Strength: {enemy.strength}</label>
                    <button name="strength" onClick={handleAdd}>+</button>
                    <button name="strength" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Agility: {enemy.agility}</label>
                    <button name="agility" onClick={handleAdd}>+</button>
                    <button name="agility" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Intellect: {enemy.intellect}</label>
                    <button name="intellect" onClick={handleAdd}>+</button>
                    <button name="intellect" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Vitality: {enemy.vitality}</label>
                    <button name="vitality" onClick={handleAdd}>+</button>
                    <button name="vitality" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Spirit: {enemy.spirit}</label>
                    <button name="spirit" onClick={handleAdd}>+</button>
                    <button name="spirit" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Experience: </label>
                    <input type='number' onChange={handleChange} value={enemy.experience}/>
                </div>
                <button onClick={handleSave}>Save</button>
            </div>
            <EnemyAbilities enemy={enemy} setEnemy={setEnemy}/>
            <Abilities/>
        </div>
    )
}

export default Enemy