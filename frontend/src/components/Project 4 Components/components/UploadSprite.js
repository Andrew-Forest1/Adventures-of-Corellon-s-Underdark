import { useState } from "react";

function UploadSprite({setSprites, user}){
    const [state, setState] = useState({
        name: '',
        private: false,
        image: null,
        user_id: user.id
    });

    const onTextChange = (e) => { 
        setState(current => {return {...current, name: e.target.value }});
    };

    const onImageChange = (e) => { 
        setState(current => {return {...current, image: e.target.files[0] }});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('private', state.private);
        formData.append('image', state.image);
        formData.append('user_id', state.user_id);

        fetch('/sprites', {
          method: 'POST',
          body: formData
        })
        .catch(error=>console.log(error));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={onTextChange} value={state.title}/>
                <input type="file" accept="image/*" multiple={false} onChange={onImageChange}/>
                <button type="submit">Upload</button>
            </form>
        </div>    
    )
}

export default UploadSprite