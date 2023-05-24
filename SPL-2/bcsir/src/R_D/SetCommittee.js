import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';

function SetCommittee(props) {
  const [researcherID, setID] = useState();
  const [researcherName, setResearcherName] = useState();
  const [password, setPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggesionArr, setSuggesionArr] = useState([]);

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
      const result2 = await axios.post("http://localhost:3001/RD/getCommitteeSuggession");    // RD/research and development
      setSuggesionArr(result2.data);
      console.log(info[0].type, " is researcher type")
      if(info && info[0].type === 'admin'){
        setTittle("Set Research Co-ordinator(PI)");
      }
      else if(info && (info[0].type === 'Director' || info[0].type === 'PI')){
        setTittle("Set Research Division Head");
        const result = await axios.post("http://localhost:3001/RD/getResearcher", { dept: info[0].departmentID });      //RD/authority
        setSuggesionArr(result.data);
      }
      else{
        navigate("/login");
      }
    }
    handleSuggesion();
  },[info]);



  const handleResearcherSelect = (ID, name) => {
    setID(ID);
    setResearcherName(name);
  }


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddCommitteeMember = async (event) => {
    event.preventDefault();
    const result = await axios.post("http://localhost:3001/RD/conformation", {
           ID: info[0].ID,
           pass: password
    });
    console.log("Here are match output ",result.data)

    if(result.data === "Password matches"){
      setShowConfirmationModal(false);
      console.log("Here are result: ",researcherID);

      //code for check confirm password
      if(info[0].type === 'admin'){
        axios.post("http://localhost:3001/RD/setPI",inputs);
      }
      else if(info[0].type === 'Director' || info[0].type === 'PI'){
        axios.post("http://localhost:3001/RD/setRDHead",inputs);
      }
    }
    else{
      setErrorMessage("Confirmation password not match");
      console.log("Here are error");
    }

  };

  return (
    <div className="container">
      <h1>{tittle}</h1>
      <h4>Select your researcher</h4>
      <div className='container'>
          <div className="row">
            <div style={{display:"flex"}}>
              {suggesionArr.map((user) => (<ProfileCard key={user.ID} name={user.Name} designation={user.Designation} photo={user.Photo} ID={user.ID} dept ={user.DepartmentName} onClick={handleResearcherSelect}/>))}
            </div>
          </div>  
      </div>
      {researcherName && (<p>{researcherName} is selected as research co-ordinatore</p>)}
     
      <button type="button" className="btn btn-primary" onClick={() => setShowConfirmationModal(true)}>Confirm</button>
      {/* <button type="button" className="btn btn-primary" onClick={() => setShowConfirmationModal(true)}>Add Committee Member</button> */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
              <p>Are you sure you want to add {researcherName} as a committee member?</p>
                <div>
                  <label>Confirm with your Password:</label>
                  <input type="password" value={password} onChange={handlePasswordChange} required />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAddCommitteeMember}>Confirm</button>
              </div>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default SetCommittee;
