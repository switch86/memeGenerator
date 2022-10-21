import React from "react"
import axios from "axios"

export default function Color(props) {

    // const [colorData, setColorData] = React.useState({})
    const [randomColor, setRandomColor] = React.useState("")
    const [count, setCount] = React.useState(0)

    function handleClick(event) {
        event.preventDefault()
        setCount(count => {
            return (count + 1)
        })
    }

    React.useEffect(() => {
        axios.get("https://www.colr.org/json/color/random?timestamp=${new Date().getTime()}")
        .then((response) => {
           setRandomColor(`#${response.data.colors[0].hex}`)
        })
        .catch(error => console.log(error))
    }, [count])
    
    return (
    <div className="Color" style={{backgroundColor:randomColor}} onClick={handleClick}>

    </div>
    )
}