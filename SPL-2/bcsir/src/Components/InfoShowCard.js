import React from 'react'
import { FunctionInfo } from '../App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function InfoShowCard(props) {
    const name=props.name;
    const designation = props.designation;
    const photo = props.photo;
    //const history = useHistory();
    const btnFunc=()=>{
        console.log("button clicked");
        FunctionInfo(123);
        console.log("button clicked second time");
        //Navigate("/profile");
    }

    const submitButton =async (e) =>{
      console.log("button clicked");
        FunctionInfo(123);
        console.log("button clicked second time");
      await axios.post("http://localhost:3001");
      Navigate("/");
    }
  return (
    <>
        <div className=" mx-3 card shadow p-3 mb-5 bg-body-tertiary rounded" style={{width:"18rem",float:"left"}}>
        <img src={photo} className="card-img-top" alt={`Photo of ${name}`}/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{designation}</p>
            <a onClick={submitButton} href='/profile' className="btn btn-outline-info" >Go to profile</a>
        </div>
        </div>
    </>
  )
}

InfoShowCard.defaultProps={
    photo: "aaa.jpg"
}