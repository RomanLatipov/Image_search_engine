import './App.css';
import {useState, useRef} from 'react';

function App() {
  const [temp, setTemp] = useState('');
  // const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [display, setDisplay] = useState('None');
  const [data, setData] = useState('')

  function selectFiles() {
    fileInputRef.current.click();
  }
  function upLoadImage(event) {
    let imgLink = URL.createObjectURL(event.target.files[0]);
    setTemp(imgLink)
    console.log(imgLink)
  }
  function onDragOver(event){
    event.preventDefault();
    // setIsDragging(true)
    event.dataTransfer.dropEffect = "copy";
  }
  // function onDragLeave(event) {
  //   event.preventDefault();
  //   setIsDragging(false);
  // }
  function onDrop(event) {
    event.preventDefault();
    // setIsDragging(false);
    const files = event.dataTransfer.files[0]
    let imgLink = URL.createObjectURL(files); 
    console.log(imgLink)
    setTemp(imgLink)
    setDisplay("Block")

    const reader = new FileReader()
    let string64 = ""
    reader.addEventListener("load", () => {
      string64 = reader.result.replace("data:", "").replace(/^.+,/, "");
      // console.log(test)
      
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
      .then(data => setData(data.string0))
    })
    reader.readAsDataURL(files);
  }
  return (<>
  {/* enctype='multipart/form-data' */}
    <div className="upload-container" >
      <div className="display-container">
        <div className="image-container" style={{display: display}}>
          <img src={temp}/>
        </div>
        <div className="upload-files-container">
          <div className="drag-file-area" onDragOver={onDragOver} onDrop={onDrop}>
            <span className="material-icons-outlined upload-icon"> file_upload </span>
            <h3 className="dynamic-message"> Drag & drop any image here </h3>
            {/* <label className="label"> or <span className="browse-files"> <input type="file" accept="image/*" className="default-file-input" multiple ref={fileInputRef} onChange={upLoadImage}/> <span className="browse-files-text">browse image</span> <span>from device</span> </span> </label> */}
          </div>
          <button type="button" className="search-button"> Search </button>
        </div>
      </div>
    </div>
    <img src={`data:image/jpeg;base64,${data}`} />
        {/* <span className="cannot-upload-message"> <span className="material-icons-outlined">error</span> Please select a file first <span className="material-icons-outlined cancel-alert-button">cancel</span> </span> */}
        {/* <div className="file-block">
          <div className="file-info"> <span className="material-icons-outlined file-icon">description</span> <span className="file-name"> </span> | <span className="file-size">  </span> </div>
          <span className="material-icons remove-file-icon">delete</span>
          <div className="progress-bar"> </div>
        </div> */}
        
    
  </>)
}

export default App