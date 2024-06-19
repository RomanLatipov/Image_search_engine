import './App.css';
import Image from './Image';
import {useState, useRef} from 'react';

function App() {
  const [imgLink, setImgLink] = useState('');
  const [img, setImage] = useState('')
  const [displayImage, setDisplayImage] = useState('None');
  const [data, setData] = useState({"string0":'',
                                    "string1":'',
                                    "string2":''});
  const [displayResults, setDisplayResults] = useState('none');
  const fileInputRef = useRef(null);

  function upLoadImage(event) {
    setImage(event.target.files[0]);
    let imgLink = URL.createObjectURL(event.target.files[0]);
    setImgLink(imgLink);
    setDisplayImage("block");
    console.log(imgLink);
  }

  function onDragOver(event){
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  function onDrop(event) {
    event.preventDefault();
    const imgFile = event.dataTransfer.files[0];
    if (imgFile.type.includes("image")) {
      setImage(imgFile);
      let imgLink = URL.createObjectURL(imgFile); 
      setImgLink(imgLink);
      setDisplayImage("block");
    }
    else
      alert("Must be an image!")
  }

  function onSearch() {
    if (img === '') {
      alert("Please choose an image");
    }
    else {
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = () => {
        const string64 = reader.result.replace("data:", "").replace(/^.+,/, "");
        
        fetch('http://localhost:5555/post_rqst', {
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
            "string": string64
          })
        })
        .then(res => res.json())
        .then(resData => {
          setData(resData);
          setDisplayResults("block");
        })
      }
    }
  }

  return (<>
    <div className="upload-container" >
      <div className="display-container">
        <div className="image-container" style={{display: displayImage}}>
          <img src={imgLink}/>
        </div>
        <div className="upload-files-container">
          <div className="drag-file-area" onDragOver={onDragOver} onDrop={onDrop}>
            <span className="material-icons-outlined upload-icon"> file_upload </span>
            <h2 className="dynamic-message"> Drag & drop any image here </h2>
            <span>or <span className="browse-files"> <span className="browse-files-text">browse file</span> <span>from device</span> <input type="file" className="default-file-input" style={{cursor: "pointer"}} multiple ref={fileInputRef} onChange={upLoadImage}/></span> </span>
          </div>
          <button type="button" className="search-button" onClick={onSearch}> Search </button>
        </div>
      </div>
    </div>
    <div style={{display: displayResults}}>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <Image img64={data.string0} />
        <Image img64={data.string1} />
        <Image img64={data.string2} />
      </div>
    </div>
  </>)
}

export default App