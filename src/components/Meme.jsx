import Post from './Post'
import Text from "./Text"
import Data from "../assets/Data"
import React from "react"


export default function Meme() {
    let [memesArray, setMemesArray] = React.useState(Data.data.memes)
    // let random = Math.floor(Math.random() * memesArray.length)
    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    
    function getMemeImage() {
        let random = Math.floor(Math.random() * memesArray.length)
        setMemeImage(prevState => {
            return {
                ...prevState,
                randomImage: memesArray[random].url
            }
        })
    }
    function handleChange(event) {
        event.preventDefault()
        const {name, value} = event.target
        setMemeImage(prevImage => {
            return {
                ...prevImage,
                [name]: value,
            }
        })
    }
    return (
        <div className="memePage">
            <div className="MemeForm" name="Form">
                <input name="topText" className="topText" placeholder="Top Text" onChange={handleChange} value={memeImage.topText}></input>
                <input name="bottomText" className="bottomText" placeholder="Bottom Text" onChange={handleChange} value={memeImage.bottomText}></input>
                <button onClick={getMemeImage} className="formButton">Get a new meme image</button>    
            </div>
            <div className="meme">
                <img src={memeImage.randomImage}></img>
                <h1 className="topText">{memeImage.topText}</h1>
                <h1 className="bottomText">{memeImage.bottomText}</h1>        
            </div>
        </div>
    )
}