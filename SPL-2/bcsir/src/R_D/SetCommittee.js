import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';
import { useNavigate } from 'react-router-dom';

function SetCommittee(props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedID, setSelectedID] = useState();
  const [password, setPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggesionArr, setSuggesionArr] = useState([]);
  const [departmentSugg, setDepartmentSugg] = useState([]);

  const [tittle, setTittle] = useState('Set Authority');
  const [info, setInfo] = useState([]);
  const inputs = {
    ID: "",
    departmentID: "",
  }
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
        //inputs.ID = ID.data['id'];
        setInfo(ID.data);
        console.log(" Here is info ", ID.data);
        
      }  
    }
    handleProfileClick();
  },[result]);


  useEffect(()=>{
    async function handleSuggesion(){
      const result2 = await axios.post("http://localhost:3001/RD/getCommitteeSuggession");
      setSuggesionArr(result2.data);
      console.log(info[0].type, " is researcher type")
      if(info && info[0].type == 'admin'){
        setTittle("Set Research Co-ordinator(PI)");
      }
      else if(info && (info[0].type == 'Director' || info[0].type == 'PI')){
        setTittle("Set Research Division Head");
        const result = await axios.post("http://localhost:3001/RD/getResearcher", { dept: info[0].departmentID });
        setSuggesionArr(result.data);
      }
      else{
        navigate("/login");
      }
    }
    handleSuggesion();
  },[info]);

  useEffect(() => {
    console.log(selectedOption, 'is selected'); // Log the selected option whenever it changes
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddCommitteeMember = () => {
     suggesionArr.map((option)=>{
      if(option.Name === selectedOption){
        setSelectedID(option.ID);
        inputs.ID = option.ID;
        console.log(selectedID, " is selected ID");
      }
    })
    inputs.departmentID = info[0].departmentID;

    //code for check confirm password
    if(info[0].type == 'admin'){
      axios.post("http://localhost:3001/RD/setPI",inputs);
    }
    else if(info[0].type == 'Director' || info[0].type == 'PI'){
      axios.post("http://localhost:3001/RD/setRDHead",inputs);
    }

  };

  return (
    <div className="container">
      <h1>{tittle}</h1>
      <div className="form-group">
        <label>Select Committee Member:</label>
        <select className="form-control" value={selectedOption} onChange={handleOptionChange}>
  <option value="">--Select--</option>
  {suggesionArr.map((option) => (
    <option key={option.ID} value={option.Name}>{option.Name} </option>
  ))}
</select>
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" className="form-control" value={password} onChange={handleAddCommitteeMember} />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAddCommitteeMember}>Confirm</button>
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
