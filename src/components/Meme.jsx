import { useState, useEffect } from "react";



export default function Meme() {
    // const [memeImage, setMemeImage] = useState("http://i.imgflip.com/1bij.jpg");

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })



    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes")
        .then(res =>res.json())
        .then(data => setAllMemeImages(data.data.memes))
    }, []);

    function getMemeImage(){
        
        const randomNumber = Math.floor(Math.random()*allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage:url
        }))
    }

    function handleChange(event){
        const{name, value} = event.target
        setMeme(prevMemeState =>({
            ...prevMemeState,
            [name]: value
        }))
    }



    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img className="meme--image" src={meme.randomImage} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}