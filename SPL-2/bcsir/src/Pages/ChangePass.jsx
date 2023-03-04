import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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



const ChangePass = ()=>{
    const [inputs, setInputs] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        //console.log(inputs.email," ",inputs.password);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("in the rey");
          console.log(inputs.email," ",inputs.password);
          //await axios.post("http://localhost:3001/api/changePass", inputs);
          //const cookieString = document.cookie;
          console.log(getCookie('my_cookies'));
          const api = axios.create({
            baseURL: 'http://localhost:3001/api',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getCookie('my_cookies')
            }
          });

         await api.post("/changePass",inputs);
          navigate("/login");
        } catch (err) {
          setError(err.response.data);
        }
      };
      return (
        <div className="auth">
          <h1>Change Password</h1>
          <form>
            <input
              required
              type="password"
              placeholder="Old Password"
              name="oldPass"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="New Password"
              name="newPass"
              onChange={handleChange}
            />
             <input
              required
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            {err && <p>{err}</p>}
            <span>
              Forgot password? <Link to="/ForgotPass">Recover</Link>
            </span>
          </form>
        </div>
      );
    };

export default ChangePass