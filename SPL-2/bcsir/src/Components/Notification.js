import React from "react";
import { useState, useEffect } from "react";
import "./PopUp.css";
import axios from "axios";

function Notification(props) {
  const [notificationData, setNotificationData] = useState([]);
  const input = {
    ID: props.ID,
  };

  useEffect(() => {
    const getNotification = async () => {
      const result = await axios.post(
        "http://localhost:3001/app/getNotification",
        input
      );
      setNotificationData(result.data);
      //console.log(notificationData, " is notification data ",result.data[0].body)
    };
    getNotification();
  }, []);

  useEffect(() => {
    // The second useEffect
    const executeOtherCode = () => {
      if (notificationData) {
        const result = axios.post(
          "http://localhost:3001/app/setNotificationStatus",
          { maxNotification: props.maxNotification }
        );
        // Perform the other code here that depends on notificationData     //profile/notification
        console.log(notificationData, " is notification data2 ");
        //set notification readable
      }
    };

    executeOtherCode();
  }, [notificationData]);

  return (
    <div className="notification-list">
      {notificationData.map((notification) => (
        <NotificationShow
          key={notification.NotificationID}
          notificationTitle={notification.Tittle}
          notificationDetails={notification.body}
          time={notification.DateTime}
        />
      ))}
    </div>
  );
}

const NotificationShow = ({ notificationTitle, notificationDetails, time }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="notification">
      <div className="notification-header" onClick={toggleExpand}>
        <p>
          <strong>{notificationTitle}</strong>{" "}
        </p>
        <small>{time}</small>
        <span>{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <p className="notification-details">{notificationDetails}</p>
      )}
      <br />
    </div>
  );
};

export default Notification;
