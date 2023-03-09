import {useState, useContext, useEffect} from 'react'
import { CharacterContext, UserContext } from './context/userContext'
import { useNavigate } from "react-router-dom";
import Abilities from './Abilities';
import CharacterAbilities from './CharacterAbilities';

function Character({}){
    const {character, setCharacter} = useContext(CharacterContext)
    const { user } = useContext(UserContext)
    //const [character, setcharacter] = useState(character);
    const navigate = useNavigate()
    const [state, setState] = useState(character ? {
        id: character.id,
        image: character.image_url,
    } : {
        id: null,
        image: null,
    });

    // useEffect(() => {
    //     if(!character){
    //         fetch(`/characters/${window.location.href.split('/')[4]}`)
    //         .then((res) => {
    //         if(res.ok){
    //             res.json()
    //             .then((character) => {
    //                 setcharacter({...character})
    //                 setState({
    //                     id: character.id,
    //                     image: character.image_url
    //                 })
    //             })
    //         }
    //         })
    //     }
    // }, []);

    const handleAdd = (e) => {
        if(character.points > 0){
            character[e.target.name] += 1
            character.points -= 1
            setCharacter({...character})
        }
    }

    const handleSubtract = (e) => {
        if(character[e.target.name] > 1){
            character[e.target.name] -= 1
            character.points += 1
            setCharacter({...character})
        }
    }

    const handleSave = () => {
        fetch(`/characters/${window.location.href.split('/')[4]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(character)
        })
        .then((res) => {
            if(res.ok){
                res.json()
                .then((character) => {
                    setCharacter(character)
                    alert("Character saved")
                })
            }else{
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

        fetch('/characterimage', {
          method: 'PUT',
          body: formData
        })
        .then((res) => {
            if(res.ok){
                res.json()
                .then((character) => {
                    setCharacter({...character})
                })
            }else{
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
    
            fetch('/characterimage', {
              method: 'PUT',
              body: formData
            })
            .then((res) => {
                if(res.ok){
                    res.json()
                    .then((character) => {
                        setCharacter({...character})
                    })
                }else {
                    res.json()
                    .then(msg => alert(msg.error))
                  }
            })
        }
    }

    if(!character) return <h1>Loading</h1>

    return(
        <div className='editCharacter'>
            <div className='editCharacterStats'>
                <h1>{character.name} Level: {character.level}</h1>
                <h2>Experience: {character.experience}</h2>
                {character.image_url ? <img onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} src={character.image_url}/> : <p onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}>Add Image</p>}
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" multiple={false} onChange={onImageChange}/>
                    <button type="submit">Upload</button>
                </form>
                <p>Unused Points: {character.points}</p>
                <div>
                    <label>Strength: {character.strength}</label>
                    <button name="strength" onClick={handleAdd}>+</button>
                    <button name="strength" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Agility: {character.agility}</label>
                    <button name="agility" onClick={handleAdd}>+</button>
                    <button name="agility" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Intellect: {character.intellect}</label>
                    <button name="intellect" onClick={handleAdd}>+</button>
                    <button name="intellect" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Vitality: {character.vitality}</label>
                    <button name="vitality" onClick={handleAdd}>+</button>
                    <button name="vitality" onClick={handleSubtract}>-</button>
                </div>
                <div>
                    <label>Spirit: {character.spirit}</label>
                    <button name="spirit" onClick={handleAdd}>+</button>
                    <button name="spirit" onClick={handleSubtract}>-</button>
                </div>
                <button onClick={handleSave}>Save</button>
            </div>
            <CharacterAbilities abilities={character.abilities} character={character} setCharacter={setCharacter}/>
            <Abilities/>
        </div>
    )
}

export default Character