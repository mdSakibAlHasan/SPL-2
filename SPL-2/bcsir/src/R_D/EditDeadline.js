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
    <div className='full_page_normal p-5 shade1'>
        <div className='shade2 p-5 rounded'>
        <center><h4>Edit Prosal call Deadline</h4></center> <hr /> <br/>
          <div className="popup-inner">
            <h4 className='mb-3'>Previous Deadline: {deadline}</h4> <hr/> <br/>
            <label className='m-1' htmlFor="new-deadline">New Deadline:</label>
            <input
              id="new-deadline"
              type="date"
              // value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            /><hr/> <br/>
            {/* <button className="btn btn-primary" onClick={handleSaveDeadline}>
              Save Deadline
            </button> */}
            <input className=' m-2 btn btn-outline-light' type="button" value="Save Deadline" onClick={handleSaveDeadline}/>

           
          </div>
        </div>
 
    </div>
  );
}
