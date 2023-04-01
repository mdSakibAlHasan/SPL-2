import {React, useState, useContext} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../compute/authContex';
export default function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
      const { login } = useContext(AuthContext);
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(inputs)
          navigate("/personalInfo");
        } catch (err) {
          setError(err.response.data);
        }
      };
  return (
    <form action="">
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
                <div className="form-group my-3">
                    <label for="EmailInput"><strong>Email:</strong> </label>
                    <input type="email" className="form-control" id="EmailInput" placeholder="Enter Email" name='email' onChange={handleChange}/>
                </div>
                <div className="form-group my-3">
                    <label for="PasswordInput"><strong>Password:</strong></label>
                    <input type="password" className="form-control" id="PasswordInput" placeholder="Enter Password" name='password' onChange={handleChange}/>
                </div>
                <center>
                  {err && <p>{err}</p>}
                <a href='/forgotPass'>Forget Password?</a> <br/>
                <input className='btn btn-outline-light' type="button" value="Login" onClick={handleSubmit}/>
                </center>
            </div>
       
        </div>
    </form>
  )
}
