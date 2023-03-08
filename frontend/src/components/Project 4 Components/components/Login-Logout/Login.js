import {useState} from 'react'

function Login({setUser, setPage, setMessage}) {

    const [user, setUserObj] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(resp => {
          if (resp.ok) {
            resp.json().then(userObj => {
              setUser(userObj)
              // console.log(`logged in as ${userObj.username}`)
              // console.log(userObj)
              //window.localStorage.setItem("user", JSON.stringify(userObj.user))
            })
          } else {
            resp.json().then(messageObj => alert(messageObj.errors))
          }
        })
    }

    const handleChange = (e) => {
        setUserObj((currentUser) => (
            {...currentUser, [e.target.name]: e.target.value}
        ))
    }

    return (
        <div className="form">
            <form className="formInput" onSubmit={handleSubmit}>
                <label className="text" >Username</label>
                <input className="inputs" type="username" name="username" onChange={handleChange} value={user.username} placeholder='username'/>
                <label className="text" >Password</label>
                <input className="inputs" name="password" type="password" maxLength="32" autoComplete="off" onChange={handleChange} value={user.password} placeholder='password'/>
                <button className="logButton" type="submit" name="submit" value={"Login"}>Log In</button>
                <p>or</p>
                <a href="signup" onClick={()=>{setPage("/signup")}}>Sign up</a>
            </form>
        </div>
    )
}

export default Login