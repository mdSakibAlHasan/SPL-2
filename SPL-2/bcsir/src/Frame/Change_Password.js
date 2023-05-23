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

      try {
        await api.post("/changePass",inputs);
        navigate("/");       
      } catch (error) {
        setError(error);
      }
      
    }
    else{
     setError("confirm password not matched")
    }      
  }

  return (
    <form action="">
        <div className='full_page shade1'>
        
            <div className='shade2 p-5 rounded'>
            <center><h4>পাসওয়ার্ড পরিবর্তন</h4></center> <hr /> <br/>
                <div className="mb-3 mt-3">
                    <label htmlFor="OldPasswordInput" className="form-label">পূর্বের পাসওয়ার্ডঃ</label>
                    <input type="password"   id="OldPasswordInput" placeholder="পূর্বের পাসওয়ার্ডটি দিন" name='oldPassword'  onChange={handleChange} /> 
              </div> <hr/>

                <div className="mb-3 mt-3">
                    <label htmlFor="PasswordInput" className="form-label">নতুন পাসওয়ার্ডঃ</label>
                    <input type="password"   id="PasswordInput" placeholder="নতুন একটি পাসওয়ার্ড দিন" name='newPassword' onChange={handleChange} /><hr/>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="RetypePasswordInput" className="form-label">রিটাইপ পাসওয়ার্ডঃ</label>
                    <input type="password"   id="RetypePasswordInput" placeholder="নতুন পাসওয়ার্ডটি পুরনরায় দিন" name='RetypePassword' onChange={handleChange} /><hr/>
                </div><br/><br/>
                {err && <p>{err}</p>}
                <input className='btn btn-outline-light'value="পাসওয়ার্ড পরিবর্তন করুন"  onClick={()=>update_password()}/> <br /><br />
            </div>
       
        </div>
    </form>
  )
}
