import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState([]);
  const serverURL = "http://localhost:5000/";

  const searchImages = async (e) =>{
    e.preventDefault();
    const response = await fetch(serverURL + "search?date=" + date);
    const responseData = await response.json();
    setImageData(responseData.photos);
    console.log(responseData);
  }

  
  return (
    <div className="App">
      <input type="date" onChange={(e)=>setDate(e.target.value)}></input>
      <button className="search" onClick={(e)=>searchImages(e)}>Search</button>
      {imageData.map((item, index)=>{
        return<div key={index} className="image-container"><a href={item.img_src} target="_blank" rel="noopener noreferrer"><img className="rover-image" src={item.img_src}></img></a></div>
      })}
    </div>
  );
}

export default App;
