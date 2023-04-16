import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoShowCard from './InfoShowCard';

function ShowResearcherList() {
  const [departmentArr, setdepartmentsArr] = useState([]);
  const [inputs, setInputs] = useState({
    dept: "",
  });
  const [researcherArr, setresearcherArr] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();

  useEffect(() => {
    const handleDepartment = async () => {
      try {
        const result = await axios.post("http://localhost:3001/api/getDepartment");
        setdepartmentsArr(result.data);
      } catch (err) {
        console.log("error occurred");
      }
    };
    handleDepartment();
  }, []);

  const handleResearcher = async () => {
    try {
      const result = await axios.post("http://localhost:3001/app/getResearcher", { dept: selectedDepartment });
      setresearcherArr(result.data);
    } catch (err) {
      console.log(err)
    }
  }

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  useEffect(() => {
    if (selectedDepartment) {
      handleResearcher();
    }
  }, [selectedDepartment]);

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
            {researcherArr.map((user) => (<InfoShowCard key={user.ID} name={user.name} designation={user.designation} ID={user.ID}/>))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowResearcherList;
