import React, { useState } from 'react';

const AddRemoveResearcher = () => {
  const [userType, setUserType] = useState('');
  const [actionType, setActionType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newResearcherEmail, setNewResearcherEmail] = useState('');
  const [selectedResearcher, setSelectedResearcher] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentNames, setDepartmentNames] = useState(['Department 1', 'Department 2', 'Department 3']);
  const [researchers, setResearchers] = useState(['Researcher 1', 'Researcher 2', 'Researcher 3']);

  const handleUserTypeSelection = (event) => {
    setUserType(event.target.value);
  };

  const handleActionTypeSelection = (event) => {
    setActionType(event.target.value);
  };

  const handleDepartmentSelection = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleNewResearcherEmailChange = (event) => {
    setNewResearcherEmail(event.target.value);
  };

  const handleSelectedResearcherChange = (event) => {
    setSelectedResearcher(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform add/remove researcher logic here based on the user type and action type
    if (userType === 'admin') {
      if (actionType === 'add') {
        console.log('Admin adding researcher:', newResearcherEmail);
        // Perform add researcher logic
      } else if (actionType === 'remove') {
        console.log('Admin removing researcher:', selectedResearcher);
        // Perform remove researcher logic
      }
    } else if (userType === 'director') {
      if (actionType === 'add') {
        console.log('Director adding researcher:', newResearcherEmail);
        // Perform add researcher logic
      } else if (actionType === 'remove') {
        console.log('Director removing researcher:', selectedResearcher);
        // Perform remove researcher logic
      }
    }
    // Reset form fields
    setUserType('');
    setActionType('');
    setSelectedDepartment('');
    setNewResearcherEmail('');
    setSelectedResearcher('');
    setShowConfirmationModal(false);
  };

  // Generate options for department selection
  const departmentOptions = departmentNames.map((departmentName, index) => (
    <option key={index} value={departmentName}>
      {departmentName}
    </option>
  ));

  // Generate options for researcher selection based on the selected department
  const researcherOptions = researchers
    .filter((researcher) => researcher !== selectedResearcher) // Exclude the selected researcher
    .map((researcher, index) => (
      <option key={index} value={researcher}>
        {researcher}
      </option>
    ));

  return (
    <div>
      <h2>Add/Remove Researcher</h2>
      <form>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={handleUserTypeSelection} required>
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="director">Director</option>
          </select>
        </div>
        <div>
          <label>Action Type:</label>
          <select value={actionType} onChange={handleActionTypeSelection} required>
            <option value="">Select action type</option>
            <option value="add">Add Researcher</option>
            <option value="remove">Remove Researcher</option>
          </select>
        </div>
        {actionType === 'add' && (
          <div>
            <label>New Researcher Email:</label>
            <input type="email" value={newResearcherEmail} onChange={handleNewResearcherEmailChange} required />
          </div>
        )}
        {actionType === 'remove' && (
          <div>
            <label>Select Researcher:</label>
            <select value={selectedResearcher} onChange={handleSelectedResearcherChange} required>
              <option value="">Select a researcher</option>
              {researcherOptions}
            </select>
          </div>
        )}
        {userType === 'admin' && (
          <div>
            <label>Select Department:</label>
            <select value={selectedDepartment} onChange={handleDepartmentSelection} required>
              <option value="">Select a department</option>
              {departmentOptions}
            </select>
          </div>
        )}
        <button type="button" onClick={() => setShowConfirmationModal(true)}>
          Confirm
        </button>
      </form>
      {showConfirmationModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to {actionType === 'add' ? 'add' : 'remove'} a researcher?
                  {actionType === 'add' ? ` Email: ${newResearcherEmail}` : ` Selected Researcher: ${selectedResearcher}`}
                  {userType === 'admin' && ` Department: ${selectedDepartment}`}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AddRemoveResearcher;
