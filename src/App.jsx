import './App.css';
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

  function selectFiles() {
    fileInputRef.current.click();
  }

  function upLoadImage(event) {
    setImage(event.target.files[0]);
    let imgLink = URL.createObjectURL(event.target.files[0]);
    setImgLink(imgLink);
    setDisplayImage("Block")
    console.log(imgLink)
  }

  function onDragOver(event){
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  function onDrop(event) {
    event.preventDefault();
    const imgFile = event.dataTransfer.files[0];
    setImage(imgFile);
    let imgLink = URL.createObjectURL(imgFile); 
    // console.log(imgLink)
    setImgLink(imgLink)
    setDisplayImage("Block")
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
          setDisplayResults("Block");
        })
      }
    }
  }

  return (<>
  {/* enctype='multipart/form-data' */}
    <div className="upload-container" >
      <div className="display-container">
        <div className="image-container" style={{display: displayImage}}>
          <img src={imgLink}/>
        </div>
        <div className="upload-files-container">
          <div className="drag-file-area" onDragOver={onDragOver} onDrop={onDrop}>
            <span className="material-icons-outlined upload-icon"> file_upload </span>
            <h3 className="dynamic-message"> Drag & drop any image here </h3>
            <label className="label"> or <span className="browse-files"> <input type="file" accept="image/*" className="default-file-input" multiple ref={fileInputRef} onChange={upLoadImage}/> <span className="browse-files-text">browse image</span> <span>from device</span> </span> </label>
          </div>
          <button type="button" className="search-button" onClick={onSearch}> Search </button>
        </div>
      </div>
    </div>
    <div style={{display: displayResults}}>
      <img src={`data:image/jpeg;base64,${data.string0}`} />
      <img src={`data:image/jpeg;base64,${data.string1}`} />
      <img src={`data:image/jpeg;base64,${data.string2}`} />
    </div>
    
        {/* <span className="cannot-upload-message"> <span className="material-icons-outlined">error</span> Please select a file first <span className="material-icons-outlined cancel-alert-button">cancel</span> </span> */}
        {/* <div className="file-block">
          <div className="file-info"> <span className="material-icons-outlined file-icon">description</span> <span className="file-name"> </span> | <span className="file-size">  </span> </div>
          <span className="material-icons remove-file-icon">delete</span>
          <div className="progress-bar"> </div>
        </div> */}
        
    
  </>)
}

export default App