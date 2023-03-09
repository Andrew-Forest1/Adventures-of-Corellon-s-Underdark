import {useState, useContext} from 'react'
import {UserContext} from '../context/userContext'

function SignUp({}) {
    const {setUser} = useContext(UserContext);

    const [newUser, setNewUser] = useState({
        Email: "", 
        UserName:"", 
        Password:"", 
        ConfirmPassword:""
    });

    const handleSubmit = (e) => {
        e.preventDefault()

        const addNewUser = {
            username: newUser.UserName,
            password: newUser.Password,
            email: newUser.Email
        }

        fetch("/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(addNewUser)
        })
        .then(resp => {
            if (resp.ok) {
              resp.json().then(userObj => {
                setUser(userObj)
              })
            } else {
              resp.json().then(messageObj => alert(messageObj.error))
            }
          })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]:e.target.value})
    }

    return (
        <div className="form">
            <form className="formInput" onSubmit={handleSubmit}>
                <label className="text">email</label>
                <input className="inputs" type="text" name="Email" onChange={handleChange} value={newUser.Email} placeholder='email'/>
                <label className="text">Username</label>
                <input className="inputs" type="text" name="UserName" onChange={handleChange} value={newUser.UserName} placeholder='username'/>
                <label className="text">Password</label>
                <input className="inputs" type="password" name="Password" maxLength="32" autoComplete="off" onChange={handleChange} value={newUser.Password} placeholder='password'/>
                <label className="text">Confirm Password</label>
                <input className="inputs" type="password" name="ConfirmPassword" maxLength="32" autoComplete="off" onChange={handleChange} value={newUser.ConfirmPassword} placeholder='confirm password'/>
                <button className="logButton" type="submit">Sign up</button>
                <p>Have an account?</p>
                <a href="login">Login</a>
            </form>

        </div>
    )
}

export default SignUp