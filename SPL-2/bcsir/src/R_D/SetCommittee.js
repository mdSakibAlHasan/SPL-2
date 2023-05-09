import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SetCommittee() {
  const [selectedOption, setSelectedOption] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggesionArr, setSuggesionArr] = useState([]);

  const options = [
    { value: 'coordinator1', label: 'Research Coordinator 1' },
    { value: 'coordinator2', label: 'Research Coordinator 2' },
    { value: 'division1', label: 'Research Division 1 Head' },
    { value: 'division2', label: 'Research Division 2 Head' },
  ];

  useEffect(()=>{
    async function handleSuggesion(){
      const result = await axios.post("http://localhost:3001/RD/getCommitteeSuggession");
      setSuggesionArr(result.data);
      //console.log(suggesionArr)
    }
    handleSuggesion();
  },[]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption," is selected")
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddCommitteeMember = () => {
    // check if password is correct for admin or director
    if (password === 'adminPassword' && selectedOption.includes('coordinator')) {
      // add research coordinator head
      // your code here
      setShowConfirmationModal(false);
    } else if (password === 'directorPassword' && selectedOption.includes('division')) {
      // add research division head
      // your code here
      setShowConfirmationModal(false);
    } else {
      setErrorMessage('Incorrect password or invalid selection.');
    }
  };

  return (
    <div className="container">
      <h1>Set Committee</h1>
      <div className="form-group">
        <label>Select Committee Member:</label>
        <select className="form-control" value={selectedOption} onChange={handleOptionChange}>
          <option value="">--Select--</option>
          {suggesionArr.map((option) => (
            <option key={option.ID} value={option.value}>{option.Name}{ option.departmentName}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="button" className="btn btn-primary" onClick={() => setShowConfirmationModal(true)}>Add Committee Member</button>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {showConfirmationModal && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowConfirmationModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to add {selectedOption} as a committee member?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAddCommitteeMember}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetCommittee;
