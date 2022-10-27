import Post from './Post'
import Text from "./Text"

import React from "react"
import axios from "axios"



let memeHTML
export default function Meme() {
    const [memeList, setMemeList] = React.useState([])
    const [memesArray, setMemesArray] = React.useState({})
    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    React.useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => res.data.data.memes)
            .then(res => {
                setMemesArray(res)
            })
            .catch(error => console.log(error))
            }, [])
        
    
    // let random = Math.floor(Math.random() * memesArray.length)
    // const [color, setColor] = React.useState(randomColor)
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
    function updateChange(num, name, value) {
        // const {name, value} = event.target
        console.log(num)
        console.log(name)
        console.log(value)
        console.log(memeImage)
        setMemeList(prevImage => {
            if (prevImage.id = num) {
                return {
                    ...prevImage,
                    [name]: value,
                }
            } else {
                return {
                    ...prevImage
                }
            }
        })
    }
    
    function saveMeme(event) {
        event.preventDefault()
        setMemeList(memeList => ([
                memeImage,
                ...memeList
            ]))
        console.log(memeList) 
        }      
            //     <div className="meme" onClick={deleteMeme}>
            //     <img src={memeItem.memeImage}></img>
            //     <h1 className="topText">{memeItem.topText}</h1>
            //     <h1 className="bottomText">{memeItem.bottomText}</h1>        
            // </div>
                   
    function deleteMeme(num) {
        let arr = memeList.splice(num, 1)
        setMemeList(arr)
    }  

    function editMeme(num) {
        setMemeImage({...memeList[num]})
        console.log(num)
        console.log("edit meme")
        console.log(memeImage)
        
    }
    function saveNewMeme(num) {
        console.log("save new meme")
    }
    let i = 0
memeHTML = memeList.map(memeImage => {
            i++
            return (
                <Post 
                    key={i}
                    id={i}
                    topText={memeImage.topText}
                    bottomText={memeImage.bottomText}
                    memeImage={memeImage.randomImage}
                    deleteMeme={deleteMeme}
                    editMeme={editMeme}
                    updateChange={updateChange}
                    saveNewMeme={saveNewMeme}
                />  
            )
        })
    return (
        <div className="memePage">
            <div className="MemeForm" name="Form">
                <input name="topText" className="topText" placeholder="Top Text" onChange={handleChange} value={memeImage.topText}></input>
                <input name="bottomText" className="bottomText" placeholder="Bottom Text" onChange={handleChange} value={memeImage.bottomText}></input>
                <button onClick={getMemeImage} className="formButton">Get a new meme image</button>    
                <button onClick={saveMeme} className="formButton">Save Meme</button>
            </div>
            <div className="meme">
                <img src={memeImage.randomImage}></img>
                <h1 className="topText">{memeImage.topText}</h1>
                <h1 className="bottomText">{memeImage.bottomText}</h1>        
            </div>
            {memeHTML}
        </div>
    )
}