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
            setError("Code matched");
            set_codematched(true);
        }catch(err){
            setError(err.response.data);
        }     
    }

    const navigate = useNavigate();
    const check_password= async (e) =>{
        console.log(cansubmit);
        if(input.newPass == input.conPass){
            setError("both matched");
            set_cansubmit(false);
            await axios.post("http://localhost:3001/api/inputPass", input);
            navigate("/Login");
        }
        else{
            setError("pass not match");
        }
        console.log(cansubmit);
    }
  return (
   
    <form action="">
        <div className='contaner bg-success-subtle'>
        
            <div className='box shadow p-3 mb-5 bg-info rounded'>
                <div className="form-group my-3">
                    <label htmlFor="EmailInput"><strong>Email:</strong> </label>
                    <input type="email" className="form-control" id="EmailInput" placeholder="Enter Email" name='email'  onChange={handleChange}/>
                </div>
                
                <input className='btn btn-outline-light' disabled={btndisable} value="Recieve Code" onClick={()=>send_code()} />
               
                <div className="form-group my-3">
                    <label htmlFor="CodeInput"><strong>Code:</strong></label>
                    <input type="password" className="form-control" id="CodeInput" placeholder="Enter Code" name='Entered_Code' value={code} onChange={handleInputChange}/>
                    
                </div>

                <input className='btn btn-outline-light' value="Submit Code" onClick={()=>check_code()}/>

                <div className="form-group my-3">
                    <label htmlFor="PasswordInput"><strong>Enter Password:</strong></label>
                    <input type="password" className="form-control" disabled={!codematched} id="PasswordInput" placeholder="Enter Password" name='newPass'  onChange={handleChangePass}/>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="RetypePasswordInput"><strong>Re-type Password:</strong></label>
                    <input type="password" className="form-control" disabled={!codematched} id="RetypePasswordInput" placeholder="Re-type Password" name='conPass'  onChange={handleChangePass}/>
                </div>

                <input className='btn btn-outline-light'value="Check password" disabled={!codematched} onClick={()=>check_password()}/> <br /><br />
                {/* <input className='btn btn-outline-light disabled' aria-disabled={cansubmit} value="Submit" type="submit"/> */}
                <button className='btn btn-outline-light' type="submit" disabled={cansubmit}>Submit</button>
                {err && <p>{err}</p>}
            </div>
       
        </div>
    </form>
  )
}
