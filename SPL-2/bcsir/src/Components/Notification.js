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
    const getNotification = async ()=>{
      const result = await axios.post('http://localhost:3001/app/getNotification',input);
      setNotificationData(result.data);
      //console.log(notificationData, " is notification data ",result.data[0].body) 
    }
    getNotification();
  },[])

  useEffect(() => {
    // The second useEffect
    const executeOtherCode = () => {
      if (notificationData) {
        const result = axios.post('http://localhost:3001/app/setNotificationStatus',{maxNotification: props.maxNotification});
        // Perform the other code here that depends on notificationData
        console.log(notificationData, " is notification data2 ")
        //set notification readable
      }
    };
  
    executeOtherCode();
  }, [notificationData]);

  

  return (
    <div >
      
      
      {notificationData && notificationData.map((option) =>{
         //console.log(option.body);
         return(
        <p>{option.body}</p>)
      })}
    </div>
  );
}

export default Notification;
