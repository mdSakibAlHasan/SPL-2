import React, { useEffect, useState } from 'react';
import { getUserType } from './UserCheck';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';

const AddRemoveResearcher = () => {
  const [info, setInfo] = useState([]);
  const [userType, setUserType] = useState('');
  const [actionType, setActionType] = useState('');
  const [isActionTypeSet, setisActionTypeSet] = useState(false);
  const [isDepartmentSet, setisDepartmentSet] = useState(false);
  const [isNewResearcherSet, setisNewResearcherSet] = useState(false);
  const [isSelectedResearcherSet, setisSelectedResearcherSet] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newResearcherEmail, setNewResearcherEmail] = useState('');
  const [selectedResearcher, setSelectedResearcher] = useState('');
  const [password, setPassword] = useState('');
  const [researcherID, setResearcherID] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [researchers, setResearchers] = useState(['Researcher 1', 'Researcher 2', 'Researcher 3']);
  const [err, setErr] = useState('');
  const inputs = {
    ID: "",
  }

  const handlePasswordChange =(event) =>{
    setPassword(event.target.value);
  }
  const handleActionTypeSelection = (event) => {
    setActionType(event.target.value);
    setisActionTypeSet(true)
  };

  const handleDepartmentSelection = (event) => {
    setSelectedDepartment(event.target.value);
    setisDepartmentSet(true)
  };

  const handleNewResearcherEmailChange = (event) => {
    setNewResearcherEmail(event.target.value);
    setisNewResearcherSet(true)
  };

  const handleSelectedResearcherChange = (event) => {
    setSelectedResearcher(event.target.value);
    setisSelectedResearcherSet(true)
  };

  var result;
  const navigate = useNavigate();
  useEffect(() => {
    function handleCookie() {
      result = getSetCookie('my_cookies');
      if (result == null) {
        navigate('/login');
      }
    }
    handleCookie();
  }, []);

  useEffect(() => {
    const handleProfileClick = async () => {
      const input = {
        cookieID: result,
      };
      input.cookieID = result;
      if (input.cookieID != null) {
        const ID = await axios.post('http://localhost:3001/app/getPersonalInfo', input);
        setInfo(ID.data);
        console.log('Here is info:', ID.data);
      }
    };
    handleProfileClick();
  }, [result]);

  useEffect(() => {
    async function handleSuggesion() {
      const result2 = await axios.post('http://localhost:3001/api/getDepartment');
      setDepartmentNames(result2.data);
      if (info && (info[0].type === 'admin' || info[0].type === 'Director' || info[0].type === 'PI')) {
        setUserType(info[0].type);
      } else {
        navigate('/login');
      }
    }
    handleSuggesion();
  }, [info]);

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
          inputs.ID = option.ID;
          setResearcherID(option.ID);
          //console.log(selectedResearcher," ------- ", option,"---------",inputs)
        }
      })
    }
    getResearcherID();
  },[selectedResearcher])
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = {
      email: newResearcherEmail,
      dept: selectedDepartment,
      deptID: info[0].departmentID,
      ID: researcherID,
    };
   

    try {
      if (userType === 'admin') {
        if (actionType === 'add') {
          console.log('Admin adding researcher:', newResearcherEmail, selectedDepartment);
          await axios.post('http://localhost:3001/api/register', input);
          console.log('Successfully added researcher');
        } else if (actionType === 'remove') {
          //console.log('Admin removing researcher:', inputs, researcherID);
          await axios.post('http://localhost:3001/app/removeResearcher',{ID: researcherID})
          // Perform remove researcher logic addResearcherByDirector
        }
      } else if (userType === 'Director') {
        if (actionType === 'add') {
          console.log('Director adding researcher:', newResearcherEmail, info[0].departmentID);
          await axios.post('http://localhost:3001/app/addResearcherByDirector', input);
          console.log('Successfully added researcher');
        } else if (actionType === 'remove') {
          //console.log('Director removing researcher:', selectedResearcher, info[0].departmentID);
          await axios.delete('http://localhost:3001/app/removeResearcher', {ID: researcherID})
          // Perform remove researcher logic
        }
      }
    } catch (err) {
      setErr(err);
      console.log(err);
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
      <option key={index} value={researcher.Name}>
        {researcher.Name}
      </option>
    ));

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className='shade2 p-5 rounded'>
      {/* <h2>Add/Remove Researcher</h2> */}
      <center><h4>Add/Remove Researcher</h4></center> <hr /> <br/>
      <form>
        <div className='p-2'>
          <label>Action Type:</label>
          <select value={actionType} onChange={handleActionTypeSelection} required>
            <option value="">Select</option>
            <option value="add">Add Researcher</option>
            <option value="remove">Remove Researcher</option>
          </select> <hr/>
        </div>
        {userType === 'admin' && isActionTypeSet && (
          <div  className='p-2'>
            <label>Select Department:</label>
            <select value={selectedDepartment} onChange={handleDepartmentSelection} required>
              <option value="">Select</option>
              {departmentOptions}
            </select> <hr/>
          </div>
        )}
        {actionType === 'add' && (
          <div  className='p-2'>
            <label>New Researcher Email:</label>
            <input type="email" placeholder='Email' value={newResearcherEmail} onChange={handleNewResearcherEmailChange} required /> <hr/>
          </div>
        )}
        {actionType === 'remove' && (
          <div  className='p-2'>
            <label>Select Researcher:</label>
            <select value={selectedResearcher} onChange={handleSelectedResearcherChange} required>
              <option value="">Select a researcher</option>
              {researcherOptions}
            </select><hr/>
          </div> 
        )} 
       
        <p>{err}</p>
        {/* <button type="button" onClick={() => setShowConfirmationModal(true)}>
          Confirm
        </button> */}
        {userType === 'admin' && isActionTypeSet && isDepartmentSet && (isNewResearcherSet|| isSelectedResearcherSet )&&(
        <input className=' m-2 btn btn-outline-light' type="button" value="Confirm Action" onClick={() => setShowConfirmationModal(true)}/>)}
        {userType === 'Director' && isActionTypeSet && (isNewResearcherSet|| isSelectedResearcherSet )&&(
        <input className=' m-2 btn btn-outline-light' type="button" value="Confirm Action" onClick={() => setShowConfirmationModal(true)}/>)}

      </form>
      {showConfirmationModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', color:"black" }}>
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

                <div>
                  <label>Your Password:</label>
                  <input type="password" style={{border:"1px solid black"}} value={password} onChange={handlePasswordChange} required />
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
    </div>
  );
};

export default AddRemoveResearcher;
