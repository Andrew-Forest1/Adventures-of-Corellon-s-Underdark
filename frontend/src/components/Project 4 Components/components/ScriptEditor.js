import { useState } from "react";

function ScriptEditor({setComponents}){
    const [code, setCode] = useState("");

    const handleChange = (e) => {
        setCode(e.target.value)
    }

    const handleClick = () => {
        const file = new File([code], "filename")
        setComponents(current => [...current, file])
        console.log(file)
    }

    return(
      <div>
        <label>Enter value : </label>
        <textarea type="textarea" name="textValue" onChange={handleChange} rows={50} cols={200}/>
        <button onClick={handleClick}>Save</button>
      </div>       
    )
}

export default ScriptEditor