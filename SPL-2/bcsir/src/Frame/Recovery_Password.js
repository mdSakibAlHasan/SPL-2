import React, { useState } from 'react'
import './Login.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Recovery_Password() {
    const [inputs, setInputs] = useState({
        email: "",
        code: "",
    });

    const [input, setInput] = useState({
    newPass: "",
    conPass: "",
    });
    const [code, setcode]=useState("");
    const [cansubmit, set_cansubmit]=useState(true);
    const [codematched, set_codematched]=useState(false);
    const [btndisable, set_btndisable]=useState(false);

    const handleInputChange = (e) => {
        setcode(e.target.value); 
    };
   
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        set_btndisable(false);
      };

      const handleChangePass = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const [err, setError] = useState(null);

    const send_code = async (e) =>{
        try{
            await axios.post("http://localhost:3001/api/forgotPass", inputs);
            set_btndisable(true);
            setError(null);
        }catch(err){
            setError(err.response.data);
        }     
    }

    const check_code = async (e) =>{
        try{
            inputs.code = code;
            await axios.post("http://localhost:3001/api/checkCode", inputs);
            setError("কোড সঠিক!");
            set_codematched(true);
        }catch(err){
            setError(err.response.data);
        }     
    }

    const navigate = useNavigate();
    const check_password = async () => {
        if (input.newPass === input.conPass) {
          // Password validation criteria
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      
          if (!passwordRegex.test(input.newPass)) {
            setError(
                "Password must be at least 8 characters long, contain both lowercase and uppercase letters, and have at least one special character."
                );
            return;
          }
      
          setError("Both Password Matched");
          set_cansubmit(false);
      
          try {
            await axios.post("http://localhost:3001/api/inputPass", input);
            navigate("/Login");
          } catch (err) {
            setError(err.response.data);
          }
        } else {
          setError("Both password are not matched. Try Again");
        }
      };
  return (
   
    <form action="">
        <div className='full_page_normal p-5 shade1'>
        
            <div className='shade2 p-5 rounded'>
            <center><h3><strong>Password Recovery</strong></h3></center> <hr /> <br/>
                <div className="mb-3 mt-3">
                    <label htmlFor="EmailInput" className="form-label">Email: </label>
                    <input type="email"  id="EmailInput" placeholder="Your Emain Here" name='email'  onChange={handleChange}/>
                </div> <hr/>
                
                <input className='btn btn-outline-light' disabled={btndisable} value="Recieve Code" onClick={()=>send_code()} />
               
                <div className="mb-3 mt-3">
                    <label htmlFor="CodeInput" className="form-label">Recieved Code</label>
                    <input type="password"  id="CodeInput" placeholder="Enter code here" name='Entered_Code' value={code} onChange={handleInputChange}/>
                    
                </div> <hr/>

                <input className='btn btn-outline-light' value="Submit Code" onClick={()=>check_code()}/>

                <div className="mb-3 mt-3">
                    <label htmlFor="PasswordInput" className="form-label">New Password</label>
                    <input type="password"  disabled={!codematched} id="PasswordInput" placeholder="Enter a new Password" name='newPass'  onChange={handleChangePass}/>
                </div> <hr/>

                <div className="mb-3 mt-3">
                    <label htmlFor="RetypePasswordInput" className="form-label">Retype Password</label>
                    <input type="password"  disabled={!codematched} id="RetypePasswordInput" placeholder="Retype the Password" name='conPass'  onChange={handleChangePass}/>
                </div> <hr/>

                <input className='btn btn-outline-light'value="Check password" disabled={!codematched} onClick={()=>check_password()}/> <br /><br />
                {/* <input className='btn btn-outline-light disabled' aria-disabled={cansubmit} value="Submit" type="submit"/> */}
                <center><button className='btn btn-outline-light' type="submit" disabled={cansubmit}>Recover Password</button></center>
                {err && <p>{err}</p>}
            </div>
       
        </div>
    </form>
  )
}
