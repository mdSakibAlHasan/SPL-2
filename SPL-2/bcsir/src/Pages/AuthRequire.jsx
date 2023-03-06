import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const AuthRequire = () => {
  const [inputs, setInputs] = useState({
    pass: "",
    //password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(inputs.email," ",inputs.password);
  };

  //const history = useHistory();

//   function handleClick() {
//     history.goBack();
//   }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("in the rey");
      //console.log(inputs.email," ",inputs.password);
      await axios.post("http://localhost:3001/api/authRequire", inputs);
      //history.goBack();
      navigate("/Home")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Authentication Required for conformation</h1>
      <form>
        <input
          required
          type="password"
          placeholder="Enter Password"
          name="pass"
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

export default AuthRequire;
