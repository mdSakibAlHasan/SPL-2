import React, { useState } from 'react';

function DeclareCall() {
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Deadline: ${deadline}\nDescription: ${description}`);
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
