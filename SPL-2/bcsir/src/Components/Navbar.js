import {React, useState, useEffect } from 'react';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

export default function Navbar() {

  const [isLogin, setIsLogin] = useState(false);
  const [profileID, setProfileID] = useState("");
  const [info, setInfo] = useState([]);
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

  useEffect(()=>{
    const handleProfileClick = async()=>{
      const input = {
        cookieID: result,
      }
      input.cookieID = result;
      //console.log(input.cookieID," is get in profile cookie");
      const ID = await axios.post('http://localhost:3001/app/getProfileID',input)
      //console.log("The ID id",ID.data['id']);
      setProfileID(ID.data['id']);
      const Name = await axios.post('http://localhost:3001/app/getResearcherName');
      setInfo(Name.data);
    }
    handleProfileClick();
  },[result]);
 

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

  //for auto suggession
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : info.filter(option =>
      typeof option.Name === 'string' && option.Name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };


  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: 'Type a fruit name',
    value,
    onChange,
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
            <a className="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
        <li className="nav-item">
          <a className="nav-link" href="/home">About BCSIR</a>
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
          {isLogin && <a href={`/profile/${profileID}`} className="btn btn-outline-light">Profile</a>}
        </li>
        <li className="nav-item d-flex">
              <div className='shade1 p-3 full_page_height' style={{ display: "inline-block" }}>
            <div>
            <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={suggestion => suggestion}
            renderSuggestion={suggestion => <div>{suggestion.Name}</div>}
            inputProps={inputProps}
          />
          </div>
          </div>
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
