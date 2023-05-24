import React, { useState } from 'react';

const SendNotification = () => {
  const [userType, setUserType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [sendViaEmail, setSendViaEmail] = useState(false);
  const [sendViaProfile, setSendViaProfile] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [departmentNames] = useState(['Department 1', 'Department 2', 'Department 3']); // Pre-defined department names

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setSelectedDepartment('');
  };

  const handleDepartmentSelection = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSendViaEmailChange = () => {
    setSendViaEmail(!sendViaEmail);
  };

  const handleSendViaProfileChange = () => {
    setSendViaProfile(!sendViaProfile);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform notification sending logic here
    console.log('User Type:', userType);
    console.log('Department:', selectedDepartment);
    console.log('Send via Email:', sendViaEmail);
    console.log('Send via Profile:', sendViaProfile);
    console.log('Title:', title);
    console.log('Body:', body);
    // Reset form fields
    setUserType('');
    setSelectedDepartment('');
    setSendViaEmail(false);
    setSendViaProfile(false);
    setTitle('');
    setBody('');
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={handleUserTypeChange} required>
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="director">Director</option>
          </select>
        </div>
        {userType === 'admin' && (
          <div>
            <label>Select Department:</label>
            <select value={selectedDepartment} onChange={handleDepartmentSelection} required>
              <option value="">Select a department</option>
              {departmentNames.map((departmentName, index) => (
                <option key={index} value={departmentName}>
                  {departmentName}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Send via Email:</label>
          <input type="checkbox" checked={sendViaEmail} onChange={handleSendViaEmailChange} />
        </div>
        <div>
          <label>Send via Profile:</label>
          <input type="checkbox" checked={sendViaProfile} onChange={handleSendViaProfileChange} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={handleBodyChange} required />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendNotification;
