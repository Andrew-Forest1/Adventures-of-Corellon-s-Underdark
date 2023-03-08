import { useState } from "react"

function CreateComponent({setComponents}){
    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        setFileName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const script = "hello world"
        const blob = new Blob(script)
    }

    return(
        <div>
            <form className="createComponent" onSubmit={handleSubmit}>
                <label htmlFor="name">Component Name</label>
                <input onChange={handleChange} value={fileName} type="text" name="name"/>
                <button type="submit">Create New Component</button>
            </form>
        </div>
    )
}

export default CreateComponent