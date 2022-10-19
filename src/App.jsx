import './App.css'
import Header from "./components/Header.jsx"
import Meme from "./components/Meme.jsx"
import Post from "./components/Post.jsx"
import Data from "./assets/Data.jsx"

function App() {
  // let data = Data.data.memes
  // let random = Math.floor(Math.random() * data.length)
  // let meme = data[random]
  // let key = meme.id

  return (
    <div className="App">
        <Header />
        <Meme />
        {/* <Post 
        key={key}
        {...meme}
        /> */}
    </div>
  )
}

export default App
