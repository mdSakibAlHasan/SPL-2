import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';


export default function Registration() {
    const departments = ["Option 1", "Option 2", "Option 3"];   //database theke departgulo ante hobe
    const [selectedOption, setSelectedOption] = useState(" ");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <form action="">
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
                <h3>Add Researcher</h3>
                <div class="form-group my-3">
                    <label htmlFor="DepartmentInput"><strong>Department:</strong> </label> <br />
                    <select style={{width:"100%"}} className='btn btn-outline-light' id="DepartmentInput" name="department" value={selectedOption} onChange={handleOptionChange}>
                        {/* <option value="">Please choose a Department</option> */}
                        {departments.map((option, index) => (
                        <option key={index} value={option} name="department">
                            {option}
                        </option>
                        ))}
                    </select>
                </div>
                <div class="form-group my-3">
                    <label htmlFor="EmailInput"><strong>Email:</strong> </label>
                    <input type="email" class="form-control" id="EmailInput" placeholder="Enter Email" name='Email'/>
                </div>

                <input className='btn btn-outline-light' type="submit" value="Add Researcher"/>
            </div>
        </div>
    </form>
    
  )
}
