import React from "react"

export default function Post(props) {
    const [editing, setEditing] = React.useState(false) 
    function handleClick(event) {
        event.preventDefault()
        props.handleClick(props.id)
        }
    function editMeme(event) {
        event.preventDefault()
        setEditing(true)
        props.editMeme(props.id)
    }
    function handleChange(event) {
        event.preventDefault()
        props.handleChange(props.id, event.target.name, event.target.value)
    }
    function saveMeme(event) {
        const {name, value} = event.target
        event.preventDefault()
        props.saveMeme(props.id)
        setEditing(false)
    }
    return (
        <div className="meme">
            <img src={props.memeImage}></img>
            <h1 className="topText">{props.topText}</h1>
            <h1 className="bottomText">{props.bottomText}</h1>
            {editing ? 
            <form>
                <input name="topText" className="topText" placeholder="Top Text" onChange={handleChange} value={props.topText}></input>
                <input name="bottomText" className="bottomText" placeholder="Bottom Text" onChange={handleChange} value={props.bottomText}></input>
                <button className="formButton" onClick={saveMeme}>Save</button>
            </form> : 
            <div>
                <button className="formButton" onClick={handleClick}>Delete</button>        
                <button className="formButton" onClick={editMeme}>Edit</button>        
            </div>}
        </div>
    )
}