import React,{useEffect} from 'react'
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
  const [err, setError] = useState();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if(inputs.newPassword === inputs.RetypePassword)
      setError("confirm password not matched");
    else
      setError("Matched");
  };
   

  const navigate = useNavigate();

  useEffect(() => {
    function handleCookie(){
      if(getCookie('my_cookies') == null){
        navigate("/login");
      }
    };
    handleCookie();
  }, []); 

  const update_password = async () => {
    if (inputs.newPassword === inputs.RetypePassword) {
      // Password validation criteria
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  
      if (!passwordRegex.test(inputs.newPassword)) {
        setError(
          "Password must be at least 8 characters long, contain both lowercase and uppercase letters, and have at least one special character."
        );
        return;
      }
  
      console.log(getCookie('my_cookies'));
      const api = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('my_cookies')
        }
      });
  
      try {
        await api.post("/changePass", inputs);
        navigate("/");
      } catch (error) {
        setError(error);
      }
    } else {
      setError("Confirm password does not match");
    }
  }

  return (
    <form action="">
        <div className='full_page_normal p-5 shade1'>
        
            <div className='shade2 p-5 rounded'>
            <center><h3><strong>Change Password</strong></h3></center> <hr /> <br/>
                <div className="mb-3 mt-3">
                    <label htmlFor="OldPasswordInput" className="form-label">Previous Password</label>
                    <input type="password"   id="OldPasswordInput" placeholder="Your Password Here" name='oldPassword'  onChange={handleChange} /> 
              </div> <hr/>

                <div className="mb-3 mt-3">
                    <label htmlFor="PasswordInput" className="form-label">New Password</label>
                    <input type="password"   id="PasswordInput" placeholder="Type a new Password Here" name='newPassword' onChange={handleChange} /><hr/>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="RetypePasswordInput" className="form-label">Retype New Password</label>
                    <input type="password"   id="RetypePasswordInput" placeholder="Retype the new Password Here" name='RetypePassword' onChange={handleChange} /><hr/>
                </div><br/><br/>
                {err && <p>{err}</p>}
                <input className='btn btn-outline-light'value="Change Password"  onClick={()=>update_password()}/> <br /><br />
            </div>
       
        </div>
    </form>
  )
}
