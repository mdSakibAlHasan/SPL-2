import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoShowCard from './InfoShowCard';
import Footer from '../Footer/Footer';

function ShowResearcherList() {

  //const departmentOptions = ['Department A', 'Department B', 'Department C'];
  const [departmentArr, setdepartmentsArr]=useState([]);


  const [inputs, setInputs] = useState({
    dept: "",
  });
  const [researcherArr, setresearcherArr]=useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  var result;
  useEffect(() => {
    const handleDepartment = async () => {
      try {
        console.log("here");
        result = await axios.post("http://localhost:3001/api/getDepartment");
        console.log("ekhane print hobe ");
        console.log(result.data[0]);
        setdepartmentsArr(result.data);
        console.log(departmentArr);
        console.log("ekhane print ses ");
      } catch (err) {
        console.log("error occur");
      }
    };
    handleDepartment();
  }, []); 


  const handleResearcher =async (e) =>{
    try{
      inputs.dept = selectedDepartment;
      console.log(inputs.dept);
      result = await axios.post("http://localhost:3001/app/getResearcher", inputs);
      setresearcherArr(result.data);
      console.log(researcherArr,"this is researcher");
    }catch(err){
      console.log(err)
    }
  }
  

  
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    handleResearcher();
  };

  return (
    <div className="container">
      <h1>Show Researcher List</h1>
      <div className="form-group">
        <label htmlFor="departmentSelect">Select Department:</label>
        <select className="form-control" id="departmentSelect" value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="">Select a department</option>
          {departmentArr.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <br/><br/>
      </div>
      {selectedDepartment && (
        <div className="row">
          <div style={{display:"flex"}}>
        {researcherArr.map((user)=>(<InfoShowCard name={user.name} designation={user.designation}  ID={user.ID}/>))}
    </div>
        </div>
      )}
    </div>
  );
}

export default ShowResearcherList;
