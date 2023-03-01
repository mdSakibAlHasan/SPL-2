import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from '@emailjs/browser';

export const ForgotPass = () => {
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs.email);
  };

  function sendEmail(email) {
    const templateParams = {
      from_name: 'Sakib Al Hasan',
      from_email: 'bcsir@example.com',
      to_name: 'User',
      to_email: email,
      message: 'Hello, , How are you!'
    };
  
    emailjs.send('service_gd421l5', 'template_loga0fr', templateParams, '3WquqantPEfEu9wAo')
      .then((result) => {
        console.log(result.text);
        console.log("email send")
      }, (error) => {
        console.log(error);
        console.log("email n ot send")
      });
  }

  //const history = createBrowserHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //sendEmail(inputs.email);
    try {
      console.log("in the rey");
      console.log(inputs.email);
      await axios.post("http://localhost:3001/api/forgotPass", inputs);
      //navigate("/login");       //mustChange
      navigate("/CodePage");
      console.log("before history")
      //history.push("/CodePage");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Forgot Password</h1>
      <form>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Send code</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  );
};



export function CodePage() {
    console.log("sakib");
    const [inputs, setInputs] = useState({
        otp: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(inputs.otp);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("in the rey");
          console.log(inputs.otp);
          await axios.post("http://localhost:3001/api/match", inputs);
          navigate("/login");       //mustChange
        } catch (err) {
          setError(err.response.data);
        }
      };
    

    return (
        <div className="auth">
        <h1>OTP</h1>
        <form>
          <input
            required
            type="number"
            placeholder="Enter otp"
            name="otp"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Submit</button>
          {err && <p>{err}</p>}
        </form>
      </div>
    );
  };



//export default ForgotPass;
