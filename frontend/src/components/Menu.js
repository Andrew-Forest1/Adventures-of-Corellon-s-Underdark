import { useNavigate } from "react-router-dom"

function Menu({setMenu}){
    const navigate = useNavigate()

    return(
        <nav className="navbar" id="navbar">
            <button onClick={() => {setMenu(current => !current)}}>Menu</button>
            <button onClick={() => {navigate('/enemies')}}>Enemies</button>
            <button onClick={() => {}}>Create Dungeon</button>
            <button onClick={() => {navigate('/dnd')}}>Dungeons and Dragons API</button>
        </nav>
    )
}

export default Menu