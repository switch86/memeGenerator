import React from "react"

export default function Post(props) {
    const {editMeme}=props
    const [editFormInputs, setEditFormInputs]=React.useState({
        topText: props.topText,
        bottomText: props.bottomText
    })
    const [editing, setEditing] = React.useState(false) 
    function deleteMeme(event) {
        event.preventDefault()
        props.deleteMeme(props.id)
        }
    function updateMeme(event) {
        event.preventDefault()
        editMeme(props.id)
        setEditing(true)
    
    }
    function updateChange(event) {
        const {name, value} = event.target
        setEditFormInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value,
            }
        })
    }
    
    function saveNewMeme(event) { 
        event.preventDefault()
        const {name, value} = event.target
        props.saveUpdatedMeme(props.id, editFormInputs)
        setEditing(false)
    
    }
    return (
        <div className="meme">
            <img src={props.memeImage}></img>
            <h1 className="topText">{props.topText}</h1>
            <h1 className="bottomText">{props.bottomText}</h1>
            {editing ? 
            <form>
                <input 
                    name="topText" 
                    className="topText" 
                    placeholder="Top Text" 
                    onChange={updateChange} 
                    value={editFormInputs.topText}
                />
                <input 
                    name="bottomText" 
                    className="bottomText" 
                    placeholder="Bottom Text" 
                    onChange={updateChange} 
                    value={editFormInputs.bottomText}
                />
                <button className="formButton"  onClick={saveNewMeme}>Save</button>
            </form> 
            : 
            <div>
                <button className="deleteButton" onClick={deleteMeme}>Delete</button>        
                <button className="editButton" onClick={updateMeme}>Edit</button>      
            </div>}
        </div>
    )
}