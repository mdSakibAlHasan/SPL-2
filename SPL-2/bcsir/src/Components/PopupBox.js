import React from 'react';
import { useState } from 'react';
import './PopUp.css';

function PopupBox() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  return (
    <div >
       <div>
      {/* <button onClick={togglePopup}>Show Popup</button>
      {showPopup && <div className="overlay" />}
      {showPopup && <PopupBox />} */}
      <h1>Hellow Guyes number 1</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>
      <h1>Hellow Guyes</h1>

      

    </div>
    </div>
  );
}

export default PopupBox;
