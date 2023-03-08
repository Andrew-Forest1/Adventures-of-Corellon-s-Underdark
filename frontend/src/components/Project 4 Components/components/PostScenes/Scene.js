import GameObject from "../../Scripts/GameObject"
import { useNavigate } from "react-router-dom";

function Scene({scene, setRenderScene}){
    const navigate = useNavigate()

    const onClickEdit = (e) => {
        setRenderScene(scene)
        navigate(`${scene.id}`)
    }

    return(
        <div className='SceneCard'>
            <h2>{`${scene.name} by ${scene.user.username}`}</h2>
            {scene.image ? <img src={scene.image} width={300}/> : null}
            <div className="SceneButtons">
                <button onClick={onClickEdit}>View</button>
            </div>
        </div>
    )
}

export default Scene