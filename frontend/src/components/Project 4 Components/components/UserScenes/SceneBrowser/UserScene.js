import GameObject from "../../../Scripts/GameObject"
import { useNavigate } from "react-router-dom";

function UserScene({scene, setScenes, setRenderScene}){
    const navigate = useNavigate()

    const onClickEdit = (e) => {
        setRenderScene(scene)
        navigate(`${scene.id}`)
    }

    const onClickDelete = (e) => {
        fetch(`/scenes/${scene.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res =>             
            setScenes(current => {
            const sceneId = current.findIndex(ele => ele.id === scene.id)
            return [...current.slice(0, sceneId), ...current.slice(sceneId + 1)]
        }))
    }

    return(
        <div className='SceneCard'>
            <h2>{scene.name}</h2>
            {scene.image ? <img src={scene.image} width={300}/> : null}
            <div className="SceneButtons">
                <button onClick={onClickEdit}>Edit</button>
                <button onClick={onClickDelete}>Delete</button>  
            </div>
        </div>
    )
}

export default UserScene