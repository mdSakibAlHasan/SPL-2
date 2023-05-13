import React from 'react';
import { useState, useEffect } from 'react';
import './PopUp.css';
import axios from 'axios';

function Notification() {
  const [notificationData,setNotificationData] = useState([]);
  const input = {
    ID: "",
  }
  useEffect(()=>{
    //use propos to get ID from profile
    const getNotification = async ()=>{
      const result = await axios.post('http://localhost:3001/app/getNotification',input);
      setNotificationData(result.data);
    }
    //getNotification();
  },[])

  return (
    <div >
       <div>
      
      {/* //create button to show notificationa 
      //create notification show page and send page */}
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

export default Notification;
