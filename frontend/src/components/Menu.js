import { useNavigate } from "react-router-dom"

function Menu({setMenu}){
    const navigate = useNavigate()

    return(
        <nav className="navbar" id="navbar">
            <button onClick={() => {setMenu(current => !current)}}>Menu</button>
            <button onClick={() => {navigate('/enemies')}}>Enemies</button>
            <button onClick={() => {navigate('/createdungeon')}}>Create Dungeon</button>
            <button onClick={() => {navigate('/createability')}}>Create Ability</button>
            <button onClick={() => {navigate('/shop')}}>Shop</button>
            <button onClick={() => {navigate('/inventory')}}>Inventory</button>
            <button onClick={() => {navigate('/dnd')}}>Dungeons and Dragons API</button>
        </nav>
    )
}

export default Menu