import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeclareCall() {
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [input, setinput] = useState({
    dateline: "",
    description: "",
  })

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit =async (e) => {
    console.log("submit clicked")
    input.dateline = deadline;
    input.description = description;

    e.preventDefault();
    console.log(`Deadline: ${input.dateline}\nDescription: ${input.description}, input ${input}`);
    await axios.post('http://localhost:3001/RD/declareCall',input)
    navigate('/home');
    // Add code here to submit the deadline and description to the server
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div  className='shade2 p-5 rounded'>
    <center><h4>Declare Project Call</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group p-2">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="datetime-local"
            id="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
          />
        </div> <hr/>
        <div className="form-group p-2">
          <label htmlFor="description">Description:</label>
          <textarea
            placeholder='Write description here'
            id="description"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div> <hr/>
        {/* <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
        <input className=' m-2 btn btn-outline-light' type="button" value="Declare Call" onClick={handleSubmit}/>

      </form>
    </div>
    </div>
  );
}

export default DeclareCall;