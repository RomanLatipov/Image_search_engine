// import './App.css';
import {useState, useRef} from 'react';

function App() {
  // const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [temp, setTemp] = useState('')

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
    setIsDragging(true)
  }

  return (<>
    <div className="card">
      <div className="top">
        <p>Drag & Drop image uploading</p>
      </div>
      <div className="drag-area" onDragOver={onDragOver} onDragLeave={() => setIsDragging(false)} onDrop={() => setIsDragging(false)}>
        {isDragging ? (
          <span className='select'>Drop images here</span>
        ) : (<>
          Drag & Drop image here or {" "}
          <span className="select" role="button" onClick={selectFiles}>
            Browse
          </span>
          </>)}
        <input type="file" accept="image/*" id="input-file" multiple ref={fileInputRef} onChange={upLoadImage}></input>
        <input type="text" id="text-box"></input>
        {/* <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={event => onFileSelect(event)}></input> */}
      </div>
      <div className="container">
        <div className="image">
          {/* <span className="delete">&times;</span> */}
        </div>
        <img src={temp} alt=""/>
      </div>
      <button type="">
        Search
      </button>
    </div>
  </>)
}

export default App