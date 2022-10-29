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
    function updateChange(num, name, value) {
        num = num - 1
        console.log(num)
        console.log(name)
        console.log(value)
        setMemeList(prevState => {
            return [
            prevState.map(meme => {
                if (meme.id === num) {
                    return {
                        ...meme,
                        [name]: value,
                }
                } else {
                    return {
                        ...meme
                    }
                }
            })
        ]
        })
        console.log(memeList)
    }
    
    function saveMeme(event) {
        event.preventDefault()
        setMemeList(memeList => ([
                memeImage,
                ...memeList
            ]))
        console.log(memeList) 
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
    function saveNewMeme(num) {
        console.log("save new meme")
    }
    let i = 0
    console.log(memeList)
memeHTML = memeList.map(meme => {
            i++
            return (
                <Post 
                    key={i}
                    id={i}
                    topText={meme.topText}
                    bottomText={meme.bottomText}
                    memeImage={meme.randomImage}
                    deleteMeme={deleteMeme}
                    editMeme={editMeme}
                    updateChange={updateChange}
                    saveNewMeme={saveNewMeme}
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