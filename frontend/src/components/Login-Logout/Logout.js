import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout({user, setUser}){
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/logout", {
      method: 'DELETE',
    })
    .then(res => {
      setUser(null)
      //window.localStorage.setItem("user", JSON.stringify(null))
      navigate('/login')
    })
  }, []);

  //window.localStorage.setItem("user", JSON.stringify(null))
  navigate('/login')

  return (
      <div className="form">
        <p>Logged Out</p>
      </div>
  )
}

export default Logout 