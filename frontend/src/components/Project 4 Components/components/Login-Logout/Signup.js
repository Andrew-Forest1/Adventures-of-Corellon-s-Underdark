import { useState, useEffect } from "react"

function SignUp({setUser, toggleAuth, setToggleAuth, setMessage, setPage}) {
    const [newUser, setNewUser] = useState({
        FirstName: "", 
        LastName: "", 
        Email: "", 
        UserName:"", 
        Password:"", 
        ConfirmPassword:""
    });

    const handleSubmit = (e) => {
        e.preventDefault()

        const addNewUser = {
            first_name: newUser.FirstName,
            last_name: newUser.LastName,
            username: newUser.UserName,
            password: newUser.Password,
            email: newUser.Email
        }

        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(addNewUser)
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
                <label className="text">First Name</label>
                <input className="inputs" type="text" name="FirstName" onChange={handleChange} value={newUser.FirstName} placeholder='first name'/>
                <label className="text">Last Name</label>
                <input className="inputs" type="text" name="LastName" onChange={handleChange} value={newUser.LastName} placeholder='last name'/>
                <label className="text">Username</label>
                <input className="inputs" type="text" name="UserName" onChange={handleChange} value={newUser.UserName} placeholder='username'/>
                <label className="text">Password</label>
                <input className="inputs" type="password" name="Password" maxLength="32" autoComplete="off" onChange={handleChange} value={newUser.Password} placeholder='password'/>
                <label className="text">Confirm Password</label>
                <input className="inputs" type="password" name="ConfirmPassword" maxLength="32" autoComplete="off" onChange={handleChange} value={newUser.ConfirmPassword} placeholder='confirm password'/>
                <button className="logButton" type="submit">Sign up</button>
                <p>Have an account?</p>
                <a onClick={()=>{setPage("/login")}} href="login">Login</a>
            </form>

        </div>
    )
}

export default SignUp