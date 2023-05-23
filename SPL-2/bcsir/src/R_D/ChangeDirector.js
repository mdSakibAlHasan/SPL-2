import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';

const ChangeDirector = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDirector, setSelectedDirector] = useState('Abdul jobbar ali');
  const [selectedResearcher, setSelectedResearcher] = useState('');
  const [researcherID, setResearcherID] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentNames, setDepartmentNames] = useState(['Department 1', 'Department 2', 'Department 3']);
  const [directors, setDirectors] = useState(['Director 1', 'Director 2', 'Director 3']);
  const [researchers, setResearchers] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');

  const handleDepartmentSelection = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    // Set the currently selected director based on the selected department
    const director = directors.find((dir) => dir === department);
    setSelectedDirector(director);
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
    // if (adminPassword !== 'admin123') {
    //     alert('Invalid admin password');
    //     return;
    // }
    // Perform director change logic here
    
    console.log('Department:', selectedDepartment);
    console.log('Selected Director:', researcherID);
    console.log('Selected Researcher:', selectedResearcher);
    // Reset form fields
    setSelectedDepartment('');
    setSelectedDirector('');
    setSelectedResearcher('');
    setShowConfirmationModal(false);
  };

  // Generate options for department selection
  const departmentOptions = departmentNames.map((departmentName, index) => (
    <option key={index} value={departmentName}>
      {departmentName}
    </option>
  ));

  // Generate options for researcher selection
  const researcherOptions = researchers.map((researcher, index) => (
    <option key={index} value={researcher.Name}>
      {researcher.Name}
    </option>
  ));

  return (
    <div>
      <h2>Change Director</h2>
      <form>
        <div>
          <label>Select Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentSelection} required>
            <option value="">Select a department</option>
            {departmentOptions}
          </select>
        </div>
        {selectedDirector && (
          <div>
            <label>Current Director:</label>
            <p>{selectedDirector}</p>
          </div>
        )}
        {selectedDepartment && (
          <div>
            <label>Select Researcher:</label>
            <select value={selectedResearcher} onChange={handleResearcherSelection} required>
              <option value="">Select a researcher</option>
              {researcherOptions}
            </select>
          </div>
        )}
        <button type="button" onClick={() => setShowConfirmationModal(true)}>
          Change Director
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
                  Are you sure you want to change the director of {selectedDepartment} to {selectedResearcher}?
                </p>
                <div>
                  <label>Admin Password:</label>
                  <input type="password" value={adminPassword} onChange={handleAdminPasswordChange} required />
                </div>
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

export default ChangeDirector;
