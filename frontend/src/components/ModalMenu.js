import { useNavigate } from "react-router-dom";

function ModalMenu({setMenu, setCharacter, setUser}){
    const navigate = useNavigate()

    const handleCharacter = () => {
        setMenu(current => !current)
        navigate('/characters/1')
    }

    const handleDungeons = () => {
        setMenu(current => !current)
        navigate('/dungeons')
    }

    const handleSelectCharacter = () => {
        setMenu(current => !current)
        fetch("/deselect_character", {
            method: 'DELETE',
          })
          .then(res => {
            setCharacter(null)
            navigate('/characters')
        })
    }

    const handleLogout = () => {
        fetch("/logout", {
            method: 'DELETE',
          })
          .then(res => {
            setUser(null)
            navigate('/login')
        })
    }

    const handleInventory = () => {

    }

    return (
        <div className="modalContainer">
            <button onClick={handleDungeons}>Dungeons</button>
            <br></br>
            <button onClick={handleInventory}>Inventory</button>
            <br></br>
            <button onClick={handleCharacter}>Character</button>
            <br></br>
            <button onClick={handleSelectCharacter}>Select Character</button>
            <br></br>
            <button onClick={handleLogout}>Logout</button>
            <br></br>
            <button onClick={() => {setMenu(current => !current)}}>Return</button>
        </div>
    )
}

export default ModalMenu