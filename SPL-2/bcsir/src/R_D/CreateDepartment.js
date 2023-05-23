import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';

const CreateDepartment = () => {
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [previousDepartment, setPreviousDepartment] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedResearcher, setSelectedResearcher] = useState('');
  const [researcherID, setResearcherID] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentNames, setDepartmentNames] = useState(['Department 1', 'Department 2', 'Department 3']);
  const [researchers, setResearchers] = useState(['Researcher 1', 'Researcher 2', 'Researcher 3']);

  const handleDepartmentSelection = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    // Set the currently selected director based on the selected department
  };


  const handleDepartmentNameChange = (event) => {
    setNewDepartmentName(event.target.value);
  };

  const handlePreviousDepartmentChange = (event) => {
    setPreviousDepartment(event.target.value);
  };

  const handleResearcherSelection = (event) => {
    setSelectedResearcher(event.target.value);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };


  var result;
  const navigate = useNavigate();
  useEffect(() => {
    function handleCookie(){
      result = getSetCookie('my_cookies');
      if(result==null){
        navigate("/login");
      }
    }
    handleCookie();
  }, []); 

  useEffect(()=>{
    const handleProfileClick = async()=>{
      const input = {
        cookieID: result,
      }
      input.cookieID = result;
      if(input.cookieID != null){
        const ID = await axios.post('http://localhost:3001/app/getPersonalInfo',input)
        console.log(" Here is info ", ID.data);
        if(ID.data[0].type !== "admin"){
          navigate('/login');
        }
        else{
          const result = await axios.post('http://localhost:3001/api/getDepartment');
          setDepartmentNames(result.data);
          console.log("cool");
        }
        
      }  
    }
    handleProfileClick();
  },[result]);

  useEffect(()=>{

  })

  useEffect(() => {
    const setResearcher = async () => {
      if (selectedDepartment) {
        const result = await axios.post('http://localhost:3001/app/getResearcher', { dept: selectedDepartment });
        setResearchers(result.data);
      }
    };
    setResearcher();
  }, [selectedDepartment]);

  useEffect(()=>{
    const getResearcherID = () =>{
      researchers.map(option =>{
        console.log(option)
        if(option.Name === selectedResearcher){
          //inputs.ID = option.ID;
          setResearcherID(option.ID);
          //console.log(selectedResearcher," ------- ", option,"---------",inputs)
        }
      })
    }
    getResearcherID();
  },[selectedResearcher])





  const handleSubmit = (event) => {
    event.preventDefault();
    // Check admin password
    if (adminPassword !== 'admin123') {
      alert('Invalid admin password');
      return;
    }
    // Perform department creation logic here, using newDepartmentName and selectedResearcher
    console.log('New department created:', newDepartmentName);
    console.log('Selected director:', selectedResearcher);
    // Reset form fields
    setNewDepartmentName('');
    setPreviousDepartment('');
    setSelectedResearcher('');
    setAdminPassword('');
    setShowConfirmationModal(false);
  };

  // Generate options for researcher selection based on the selected previous department
  

  return (
    <div>
      <h2>Create Department</h2>
      <form>
        <div>
          <label>New Department Name:</label>
          <input type="text" value={newDepartmentName} onChange={handleDepartmentNameChange} required />
        </div>
        <div>
          <label>Previous Department:</label>
          <select value={previousDepartment} onChange={handlePreviousDepartmentChange} required>
            <option value="">Select a department</option>
            {departmentNames.map((departmentName, index) => (
              <option key={index} value={departmentName}>
                {departmentName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Director:</label>
          <select value={selectedResearcher} onChange={handleResearcherSelection} required>
            <option value="">Select a researcher</option>
            {researchers.map((researcher, index) => (
              <option key={index} value={researcher}>
                {researcher}
              </option>
            ))}
            {/* {researcherOptions} */}
          </select>
        </div>
        <button type="button" onClick={() => setShowConfirmationModal(true)}>Create Department</button>
      </form>
      {showConfirmationModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowConfirmationModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to add {selectedResearcher} as a director of {newDepartmentName}?</p>
                <div>
                  <label>Admin Password:</label>
                  <input type="password" value={adminPassword} onChange={handleAdminPasswordChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CreateDepartment;
