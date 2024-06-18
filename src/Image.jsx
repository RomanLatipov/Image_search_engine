import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Image({image}) {
    const [test, settest] = useState({});
    function handleClick(event) {
        settest({transform: "scale(2.5)"})
    }
    const closeDropdown = () => {
        settest({})
    }
    const ref = useDetectClickOutside({ onTriggered: closeDropdown });

    return (<>
        <div className="image-result-container">
            <img src={`data:image/jpeg;base64,${image}`} style={test} onClick={handleClick} ref={ref}/>
        </div>
    </>)
}