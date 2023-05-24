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
    const check_password= async (e) =>{
        console.log(cansubmit);
        if(input.newPass == input.conPass){
            setError("উভয় পাসওয়ার্ড মিলে গেছে");
            set_cansubmit(false);
            await axios.post("http://localhost:3001/api/inputPass", input);
            navigate("/Login");
        }
        else{
            setError("উভয় পাসওয়ার্ড ভিন্ন! পুরনায় টাইপ করুন");
        }
        console.log(cansubmit);
    }
  return (
   
    <form action="">
        <div className='full_page_normal p-5 shade1'>
        
            <div className='shade2 p-5 rounded'>
            <center><h4>পাসওয়ার্ড পুনরুদ্ধার</h4></center> <hr /> <br/>
                <div className="mb-3 mt-3">
                    <label htmlFor="EmailInput" className="form-label">ই-মেইলঃ </label>
                    <input type="email"  id="EmailInput" placeholder="আপনার ই-মেইল দিন" name='email'  onChange={handleChange}/>
                </div> <hr/>
                
                <input className='btn btn-outline-light' disabled={btndisable} value="কোড রিসিভ করুন" onClick={()=>send_code()} />
               
                <div className="mb-3 mt-3">
                    <label htmlFor="CodeInput" className="form-label">কোডঃ</label>
                    <input type="password"  id="CodeInput" placeholder="কোডটি দিন" name='Entered_Code' value={code} onChange={handleInputChange}/>
                    
                </div> <hr/>

                <input className='btn btn-outline-light' value="কোড সাবমিট করুন" onClick={()=>check_code()}/>

                <div className="mb-3 mt-3">
                    <label htmlFor="PasswordInput" className="form-label">নতুন পাসওয়ার্ডঃ</label>
                    <input type="password"  disabled={!codematched} id="PasswordInput" placeholder="নতুন একটি পাসওয়ার্ড দিন" name='newPass'  onChange={handleChangePass}/>
                </div> <hr/>

                <div className="mb-3 mt-3">
                    <label htmlFor="RetypePasswordInput" className="form-label">রিটাইপ পাসওয়ার্ডঃ</label>
                    <input type="password"  disabled={!codematched} id="RetypePasswordInput" placeholder="নতুন পাসওয়ার্ডটি পুরনরায় দিন" name='conPass'  onChange={handleChangePass}/>
                </div> <hr/>

                <input className='btn btn-outline-light'value="Check password" disabled={!codematched} onClick={()=>check_password()}/> <br /><br />
                {/* <input className='btn btn-outline-light disabled' aria-disabled={cansubmit} value="Submit" type="submit"/> */}
                <center><button className='btn btn-outline-light' type="submit" disabled={cansubmit}>পাসওয়ার্ড পুনরুদ্ধার করুন</button></center>
                {err && <p>{err}</p>}
            </div>
       
        </div>
    </form>
  )
}
