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
    input.dateline = deadline;
    input.description = description;

    e.preventDefault();
    console.log(`Deadline: ${input.dateline}\nDescription: ${input.description}, input ${input}`);
    await axios.post('http://localhost:3001/RD/declareCall',input)
    navigate('/home');
    // Add code here to submit the deadline and description to the server
  };

  return (
    <div className="container">
      <h1>Declare Call</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeclareCall;