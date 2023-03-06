import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    //password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(inputs.email," ",inputs.password);
  };

  const conformation = () =>{
    navigate("/authRequire");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //conformation();
      console.log("in the rey");
      //console.log(inputs.email," ",inputs.password);
      await axios.post("http://localhost:3001/api/register", inputs);
      navigate("/");
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
        {/* <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        /> */}
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  );
};

export default Register;
