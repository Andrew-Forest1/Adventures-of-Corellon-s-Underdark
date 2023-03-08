import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Navbar({user}){
    const [more, setMore] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className="navbar" id="navbar">
            <h1 className="site-title" onClick={()=>{navigate('/scenes')}}>Spriter</h1>
            <ul>
                <button className='more2' onClick={() => setMore(current => !current)}>{user.username}</button> {
                    more ?
                    <div className='moreBox2'>
                        <li className="site" onClick={()=>{navigate('/scenes')}}>Browse Posts</li>
                        <li className="site" onClick={()=>{navigate('/logout')}}>Logout</li>
                        <li className="site" onClick={()=>{navigate('/user_scenes')}}>Account</li>
                    </div>
                :
                null
                }
            </ul>
        </nav>
    )
}

export default Navbar