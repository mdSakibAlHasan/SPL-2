import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../compute/authContex.js";

const Login = ()=>{
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
        <div className="auth">
          <h1>Login</h1>
          <form>
            <input
              required
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>
              Forgot password? <Link to="/ForgotPass">Recover</Link>
            </span>
          </form>
        </div>
      );
    };

export default Login