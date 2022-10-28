import React from "react"

export default function Post(props) {
    const {editMeme}=props
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
        event.preventDefault()
        props.updateChange(props.id, event.target.name, event.target.value)
    }
    function saveNewMeme(event) {
        const {name, value} = event.target
        event.preventDefault()
        props.saveNewMeme(props.id)
        setEditing(false)
    }
    return (
        <div className="meme">
            <img src={props.memeImage}></img>
            <h1 className="topText">{props.topText}</h1>
            <h1 className="bottomText">{props.bottomText}</h1>
            <p>{props.id}</p>
            {editing ? 
            <form>
                <input name="topText" className="topText" placeholder="Top Text" onChange={updateChange} value={props.topText}></input>
                <input name="bottomText" className="bottomText" placeholder="Bottom Text" onChange={updateChange} value={props.bottomText}></input>
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