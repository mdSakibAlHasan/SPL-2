import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";


function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[1] === name) {
      return cookie[0];
    }
  }
  return null;
}

export default function ChangePass() {
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    RetypePassword: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
   
    //let err;
    const navigate = useNavigate();


      const update_password = async (e) =>{
        if(inputs.newPassword == inputs.RetypePassword){

          console.log(getCookie('my_cookies'));
          const api = axios.create({
            baseURL: 'http://localhost:3001/api',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getCookie('my_cookies')
            }
          });

          //await axios.post("http://localhost:3001/api/changePass", inputs);
          try {
            await api.post("/changePass",inputs);
            navigate("/");       
          } catch (error) {
            alert("Old password not match");
          }
          
        }
        else{
         alert("new and confirm pass not match");
          console.log("here")
        }      
      }
  return (
    <form action="">
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
            <center><h3>Change Password</h3></center> <hr />
                <div className="form-group my-3">
                    <label htmlFor="OldPasswordInput"><strong>Enter Old Password:</strong></label>
                    <input type="password" className="form-control"  id="OldPasswordInput" placeholder="Enter Old Password" name='oldPassword'  onChange={handleChange} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="PasswordInput"><strong>Enter Password:</strong></label>
                    <input type="password" className="form-control"  id="PasswordInput" placeholder="Enter Password" name='newPassword' onChange={handleChange} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="RetypePasswordInput"><strong>Re-type Password:</strong></label>
                    <input type="password" className="form-control"  id="RetypePasswordInput" placeholder="Re-type Password" name='RetypePassword' onChange={handleChange} />
                </div>
                
                <input className='btn btn-outline-light'value="Update password"  onClick={()=>update_password()}/> <br /><br />
                {/* <input className='btn btn-outline-light disabled' aria-disabled={cansubmit} value="Submit" type="submit"/> */}
                {/* <button className='btn btn-outline-light' type="submit" >Submit</button> */}
            </div>
       
        </div>
    </form>
  )
}
