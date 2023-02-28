import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("in the rey");
      console.log(inputs.email);
      await axios.post("http://localhost:3001/api/forgotPass", inputs);
      //navigate("/login");       //mustChange
       navigate("/CodePage");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
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
        <h1>Register</h1>
        <form>
          <input
            required
            type="number"
            placeholder="otp"
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
