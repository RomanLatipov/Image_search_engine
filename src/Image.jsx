import { useState } from "react";

export default function Image({img64}) {
    const [display, setDisplay] = useState('hidden');

    function handleClick() {
        setDisplay("visible");
    }
    function off() {
        setDisplay("hidden");
    }

    async function download(image) {
        const base64Response = await fetch(`data:image/jpeg;base64,${image}`);
        const blob = await base64Response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "image.jpg";
        link.click();
    }

    return (<>
        <div className="image-result-container">
            <img src={`data:image/jpeg;base64,${img64}`} onClick={handleClick}/>
        </div>
        <div className="overlay" onClick={off} style={{visibility: display}}>
            <div className="overlay-image-container">
                <img src={`data:image/jpeg;base64,${img64}`} />
            </div>
            <button className={"search-button"} onClick={() => download(img64)}>Download</button>
        </div>
    </>)
}