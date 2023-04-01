import {React, useState, useEffect, useContext } from 'react';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';

export default function Navbar() {

  const [isLogin, setIsLogin] = useState(false);
  var result;

  useEffect(() => {
    function handleCookie(){
      result = getSetCookie('my_cookies');
      if(result!=null){
        setIsLogin(true);
      }
    }
    handleCookie();
  }, []); 


  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
     
      setIsLogin(false);
      handleRefresh(); 
    } catch (err) {
      console.log("here error in navbar");
    }
  };


  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-info bg-gradient">
    <div className="container-fluid">
      <a className="navbar-brand" href="/home">BCSIR </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
        <li className="nav-item">
          <a className="nav-link" href="/">About BCSIR</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            BCSIR Stucture
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/">Overview</a></li>
            <li><a className="dropdown-item" href="/institude">Institution</a></li>
          </ul>
        </li>
        <li className="nav-item d-flex">
          
        </li>
      </ul>
      {!isLogin && <a href="/Login" className="btn btn-outline-light">User Login</a>}
      {isLogin && <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}
