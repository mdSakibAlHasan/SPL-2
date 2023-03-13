import {React, useState, useContext} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../compute/authContex';
export default function Login() {
    // const nav=useNavigate();
    // const login_btn_clicked=()=>{
    //     //database er sathe milano, true hoile
    //     nav('/');
    // }

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
    
      //const { login } = useContext(AuthContext);
      const { login } = useContext(AuthContext);
    
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(inputs)
          navigate("/");
        } catch (err) {
          console.log("here");
          setError(err.response.data);
        }
      };
  return (
    <form action="">
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
                <div class="form-group my-3">
                    <label for="EmailInput"><strong>Email:</strong> </label>
                    <input type="email" class="form-control" id="EmailInput" placeholder="Enter Email" name='email' onChange={handleChange}/>
                </div>
                <div class="form-group my-3">
                    <label for="PasswordInput"><strong>Password:</strong></label>
                    <input type="password" class="form-control" id="PasswordInput" placeholder="Enter Password" name='password' onChange={handleChange}/>
                </div>

                <input className='btn btn-outline-light' type="submit" value="Login" onClick={handleSubmit}/>
            </div>
       
        </div>
    </form>
  )
}
