import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditDeadline() {
  const [showPopup, setShowPopup] = useState(false);
  const [deadline, setDeadline] = useState('2023-03-31');

  useEffect( ()=>{
    const getDateline = async() =>{
      const result = await axios.post('http://localhost:3001/RD/getDateline');
      setDeadline(result.data[0].last_date);
      console.log(result.data[0].last_date);
    }
    getDateline();
  },[])

  const navigate = useNavigate();
  const handleSaveDeadline = async() => {
    const deadlineString = deadline;                //just format this deadline
    const deadlineDate = new Date(deadlineString);
    const formattedDeadline = deadlineDate.toISOString().slice(0, 10);
    const input ={
      deadline: formattedDeadline,
    }
    await axios.post('http://localhost:3001/RD/editdateline',input);
    navigate('/home');
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
        Edit Deadline
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Previous Deadline: {deadline}</h3>
            <label htmlFor="new-deadline">New Deadline:</label>
            <input
              id="new-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSaveDeadline}>
              Save Deadline
            </button>
            <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
