import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';
import axios from 'axios';

const SendNotification = () => {
  const [info, setInfo] = useState([]);
  const [userType, setUserType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [sendViaEmail, setSendViaEmail] = useState(false);
  const [sendViaProfile, setSendViaProfile] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [departmentNames, setDepartmentNames] = useState([]); // Pre-defined department names


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
      console.log(info[0].type, " is researcher type")
      if(info && (info[0].type === 'admin' || info[0].type === 'PI')){
        const result2 = await axios.post('http://localhost:3001/api/getDepartment');
        setDepartmentNames(result2.data);
        setUserType("admin");
        const newItem = 'All Department';
        setDepartmentNames(prevArray => [...prevArray, newItem]);
      }
      else if(info && info[0].type === 'Director' ){
        setUserType("Director");
        // setTittle("Set Research Division Head");
        // const result = await axios.post("http://localhost:3001/RD/getResearcher", { dept: info[0].departmentID });      //RD/authority
        // setSuggesionArr(result.data);
      }
      else{
        navigate("/login");
      }
    }
    handleSuggesion();
  },[info]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post("http://localhost:3001/app/sendNotification", {
           ID: info[0].ID,
           dept: selectedDepartment,
           DepartmentID: info[0].DepartmentID,
           Email: sendViaEmail,
           Profile: sendViaProfile,
           Tittle: title,
           Body: body
    });

    console.log(result.data);
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
    <div  className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Send Notice/Notification</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>User Type:</label>
          <select value={userType} onChange={handleUserTypeChange} required>
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="director">Director</option>
          </select>
        </div> */}
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
        <center>
           <button type="submit" className="m-2 btn btn-outline-light">Send</button>
        </center>
       
      </form>
    </div>
    </div>
  );
};

export default SendNotification;
