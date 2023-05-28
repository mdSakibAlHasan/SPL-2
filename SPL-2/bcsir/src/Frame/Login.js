import { React, useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../compute/authContex";
import Navbar from "../Components/Navbar.js";

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
      await login(inputs);
      <Navbar />;
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <form action="">
      <div className="full_page_normal p-5 shade1">
        <div className="shade2 p-5 rounded">
          <center>
            <h4>
              <strong>Log In</strong>
            </h4>
          </center>{" "}
          <hr /> <br />
          <div className="mb-3 mt-3">
            <label for="EmailInput" className="form-label">
              Email:{" "}
            </label>
            <br />
            <input
              type="email"
              id="EmailInput"
              placeholder="Your Email Here"
              name="email"
              onChange={handleChange}
            />
          </div>
          <hr />
          <div className="mb-3 mt-3">
            <label for="PasswordInput" className="form-label">
              Passsword:
            </label>
            <br />
            <input
              type="password"
              id="PasswordInput"
              placeholder="Your Password Here"
              name="password"
              onChange={handleChange}
            />
          </div>
          <hr />
          <br />
          <center>
            {err && <p>{err}</p>}
            <input
              className="btn btn-outline-light"
              type="button"
              value="Log IN"
              onClick={handleSubmit}
            />
            <br />
            <br />
            <a href="/forgotPass">Foget Password? Click here to recover</a>{" "}
            <br />
            <br />
          </center>
        </div>
      </div>
    </form>
  );
}
