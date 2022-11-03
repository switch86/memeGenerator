import Post from './Post'
import React from "react"
import axios from "axios"

let memeHTML

// set state - memeList is the list of saved memes, memesArray all the meme data to be pulled from the api, and the meme image is the current working image. 
export default function Meme() {
    const [memeList, setMemeList] = React.useState([])
    const [memesArray, setMemesArray] = React.useState({})
    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })
// get meme list from api once on page load. 
    React.useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => res.data.data.memes)
            .then(res => {
                setMemesArray(res)
            })
            .catch(error => console.log(error))
            }, [])
// pick a random number between 0 and the length of the data pulled   
    function getMemeImage() {
        let random = Math.floor(Math.random() * memesArray.length)
        setMemeImage(prevState => {
            return {
                ...prevState,
                randomImage: memesArray[random].url
            }
        })
    }

// func to update the current meme image each time the value of the form changes
    function handleChange(event) {
        event.preventDefault()
        const {name, value} = event.target
        setMemeImage(prevImage => {
            return {
                ...prevImage,
                [name]: value,
            }
        })
        console.log(memeImage)
    }
    
    // function to add the memeimage to the meme list. 
    function saveMeme(event) {
        event.preventDefault()
        console.log(memeImage)
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
        console.log(meme)
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