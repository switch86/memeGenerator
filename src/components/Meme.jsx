import Post from './Post'
import React from "react"
import axios from "axios"

let memeHTML

export default function Meme() {
    const [memeList, setMemeList] = React.useState([])
    const [memesArray, setMemesArray] = React.useState({})
    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })

    React.useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => res.data.data.memes)
            .then(res => {
                setMemesArray(res)
            })
            .catch(error => console.log(error))
            }, [])
        
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
    
    function saveMeme(event) {
        event.preventDefault()
        setMemeList(memeList => ([
                memeImage,
                ...memeList
            ]))
        
        }                     
    function deleteMeme(num) {
        num = num - 1
        let arr = memeList.filter((meme, index) => index !== num)
        console.log(arr)
        setMemeList(arr)
    }  
    function editMeme(num) {
        let oldMeme = memeList[num]
        console.log(oldMeme)
        console.log("edit")
    }
    function saveUpdatedMeme(memeId, updatedMemeObject) {
        console.log("save updated meme called" )
        console.log("Item to update ID: ", memeId )
        console.log("Values to update with ", updatedMemeObject )

        setMemeList(prevList => {
            return prevList.map((currentMeme, index) => {
                if(index === memeId) { 
                    return {
                        topText: updatedMemeObject.topText, 
                        bottomText: updatedMemeObject.bottomText,
                        randomImage: currentMeme.randomImage
                    }
                }
                else { 
                    return currentMeme
                }
            })
        })
    }
    
    console.log(memeList)
    memeHTML = memeList.map((meme, index) => {
        return (
            <Post 
                key={index}
                id={index}
                topText={meme.topText}
                bottomText={meme.bottomText}
                memeImage={meme.randomImage}
                deleteMeme={deleteMeme}
                editMeme={editMeme}
                saveUpdatedMeme={saveUpdatedMeme}
                memeList={memeList}
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