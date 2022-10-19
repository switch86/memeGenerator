export default function Post(data) {
    
    return (
        <div className="Post">
            <h1 className="topText"></h1>
            <h2 className="bottomText"></h2>
            <img src={data.url}></img>
        </div>
    )
}