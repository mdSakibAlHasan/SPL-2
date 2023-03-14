import React, { useState, useEffect } from 'react'
import './Login.css'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Registration() {
    const [departmentArr, setdepartmentsArr]=useState([]);
    const [selectedOption, setSelectedOption] = useState(" ");
    const [inputs, setInputs] = useState({
      email: "",
      selectedOption: "",
    });

    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    useEffect(() => {
      const handleDepartment = async () => {
        try {
          console.log("here");
          var result = await axios.post("http://localhost:3001/api/getDepartment");
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
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

const submitButton =async (e) =>{
  inputs.selectedOption = selectedOption;
  console.log(inputs.selectedOption+" is op")
  await axios.post("http://localhost:3001/api/register", inputs);
  Navigate("/");
}

 

  return (
    <form onSubmit={submitButton}>
      
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
                <h3>Add Researcher</h3>
                <div class="form-group my-3">
                    <label htmlFor="DepartmentInput"><strong>Department:</strong> </label> <br />
                    <select style={{width:"100%"}} className='btn btn-outline-light' id="DepartmentInput" name="department" value={selectedOption} onChange={handleOptionChange}>

                        {departmentArr.map((option) => (
                        <option value={option} name="department">
                            {option}
                        </option>
                        ))}
                    </select>
                </div>
                <div class="form-group my-3">
                    <label htmlFor="EmailInput"><strong>Email:</strong> </label>
                    <input type="email" class="form-control" id="EmailInput" placeholder="Enter Email" name='email' onChange={handleChange}/>
                </div>

                <input className='btn btn-outline-light' type="submit" value="Add Researcher" />
            </div>
        </div>
    </form>
    
  )
}
