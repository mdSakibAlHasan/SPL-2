import React from 'react';
import { useState, useEffect } from 'react';
import './PopUp.css';
import axios from 'axios';

function Notification(props) {
  const [notificationData,setNotificationData] = useState([]);
  const input = {
    ID: props.ID,
  }
  useEffect(()=>{
    //use propos to get ID from profile
    const getNotification = async ()=>{
      const result = await axios.post('http://localhost:3001/app/getNotification',input);
      console.log(result, result.data);
      setNotificationData(result.data);
      console.log(notificationData, " is notification data ")
    }
    getNotification();
  },[])

  return (
    <div >
       <div>
      
      {/* //create button to show notificationa 
      //create notification show page and send page */}

{/* notificationData.map((option) => (
    <h2>{option? option[0]: ''}</h2>
  )) */}
{/* 
        notificationData.map((option) => (

        )) */}

      <h1>{notificationData[0].body}</h1>
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
