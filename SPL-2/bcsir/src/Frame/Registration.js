import React, { useState, useEffect } from 'react'
import './Login.css'
import {useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Registration() {
    const [departmentArr, setdepartmentsArr]=useState([]);
    const [selectedOption, setSelectedOption] = useState("Institute Of Fuel Research Development");
    const [err, setErr] = useState();
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
          var result = await axios.post("http://localhost:3001/api/getDepartment");
          setdepartmentsArr(result.data);
        } catch (err) {
          setErr(err)
        }
      };
      handleDepartment();
    }, []); 

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
      inputs.selectedOption = selectedOption;
    };

    const navigate = useNavigate();
    const submitButton =async (e) =>{
      try{
        inputs.selectedOption = selectedOption;
        await axios.post("http://localhost:3001/api/register", inputs);
        navigate("/");
      }catch(err){
        setErr(err)
      }
    }

 

  return (
    <form onSubmit={submitButton} method="POST">
      
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
                <h3>Add Researcher</h3>
                <div className="form-group my-3">
                    <label htmlFor="DepartmentInput"><strong>Department:</strong> </label> <br />
                    <select style={{width:"100%"}} className='btn btn-outline-light' id="DepartmentInput" name="department" value={selectedOption} onChange={handleOptionChange}>
                      {departmentArr.map((option, index) => (
                          <option key={index} value={option} name="department">
                              {option}
                          </option>
                      ))}
                    </select>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="EmailInput"><strong>Email:</strong> </label>
                    <input type="email" className="form-control" id="EmailInput" placeholder="Enter Email" name='email' onChange={handleChange}/>
                </div>
                  {err && <p>err</p>}
                <input className='btn btn-outline-light' type="button" value="Add Researcher" onClick={submitButton} />
            </div>
        </div>
    </form>
    
  )
}
