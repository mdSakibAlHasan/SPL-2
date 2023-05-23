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
        <div className='full_page shade1'>
        
            <div className='shade2 p-5 rounded'>
            <center><h4>লগ-ইন</h4></center> <hr /> <br/>
                <div className="mb-3 mt-3">
                    <label for="EmailInput" className="form-label">ই-মেইলঃ </label><br/>
                    <input type="email"  id="EmailInput" placeholder="আপনার ই-মেইল দিন" name='email' onChange={handleChange}/>
                </div><hr/>
                <div className="mb-3 mt-3">
                    <label for="PasswordInput" className="form-label">পাসওয়ার্ডঃ</label><br/>
                    <input type="password" id="PasswordInput" placeholder="আপনার পাসওয়ার্ড দিন" name='password' onChange={handleChange}/>
                </div><hr/><br/>
                <center>
                  {err && <p>{err}</p>}
                <input className='btn btn-outline-light' type="button" value="লগ-ইন করুন" onClick={handleSubmit}/>
                <br/><br/>
                <a href='/forgotPass'>পাসওয়ার্ড ভুলে গেছেন? পুনরুদ্ধার করুন</a> <br/><br/>
                </center>
            </div>
       
        </div>
    </form>
  )
}
