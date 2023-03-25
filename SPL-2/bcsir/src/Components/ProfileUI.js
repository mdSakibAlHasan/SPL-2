import React, { useState,useEffect } from "react";
// import Admin from "../Classes/Admin";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "../Footer/Footer";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
//import { getID } from "../App";

export default function Profile(props) {
  const location = useLocation();
  const segments = location.pathname.split("/");
  const profileID = segments[segments.length - 1];
  console.log(profileID);
  var result, r;
  const [inputs, setInputs] = useState({
    ID: "",
    cookie:"",
  });
  const [departmentArr, setdepartmentsArr]=useState([]);
  const [educationArr, seteducationArr]=useState([]);
  const [jobArr, setjobArr]=useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  inputs.ID = profileID;

  // const getCookie = (name) => {
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split('; ');
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split('=');
  //     if (cookie[1] === name) {
  //       inputs.cookie = cookie[0];
  //       return cookie[0];
  //     }
  //   }
  //   return null;
  // }      //jodi cookie kaj na kore taile eta commemt out koro


  useEffect(() => {
    function handleCookie(){
      console.log("I am sakib")
      r = getSetCookie('my_cookies');
      inputs.cookie = r;
      console.log(r," here are ",inputs.cookie);
    };
    handleCookie();
  }, []); 

  useEffect(() => {
    async function handleDepartment(){
      try {
        //inputs.cookie = getCookie('my_cookies');
        console.log("here");
        import(`./photo/${profileID}.jpg`)
        .then(image => setImageSrc(image.default))
        .catch(error => console.error(error, "occur here in photo"));
        //inputs.cookie = getCookie('my_cookies');
        result = await axios.post("http://localhost:3001/app/getProfileInfo",inputs);
        console.log("getprofile ");
        setdepartmentsArr(result.data);
        result = await axios.post("http://localhost:3001/app/getEducationInfo",inputs);
        console.log("geteducation");
        seteducationArr(result.data);
        result = await axios.post("http://localhost:3001/app/getJobInfo",inputs);
        setjobArr(result.data);
        console.log("getJob ");
        
        // console.log("getCookies print",inputs.cookie);
        // // if(inputs.cookie != undefined){
        // //   console.log(inputs.getCookie," in if statement first")
          result = await axios.post("http://localhost:3001/app/cookieAuth",inputs);
          console.log(result.data.id," in if statement")
          if(result.data.id == profileID){
            setIsOwner(true);
          }
    
        result = await axios.post("http://localhost:3001/app/cookieAuth",inputs);
        console.log(departmentArr[0].researchExperience+" is department array");
        console.log("ekhane print ses ",result.data);
      } catch (err) {
        console.log("error occur in last");
      }
    };
    handleDepartment();
  }, []); 


  




 const prearr=["a","b","c","d","a"];
  const photo = props.photo;
  const [arr,setarr]=useState([]);
  const [modal_title,set_modal_title]=useState();
  const [modal_body,set_modal_body]=useState();
 




  const updateArr=()=>{
    prearr.forEach(element => {
      setarr(...arr,element);
    });
    // setarr();
    console.log(arr);
  }
  
  return (
   
    <>
    {/* <Navbar/> */} <br/><br/><br/><br/>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={imageSrc} style={{ width: "60%", height: "70%" }} alt="" />{" "}
            <br />{departmentArr.length > 0 && departmentArr[0].name} <br /> 
            {departmentArr.length > 0 && departmentArr[0].designation} <br />
            {isOwner && <button>Edit Profile</button>}
            
          </div>
          <div className="col">
            <h3>About Me</h3>
            <p>
            {departmentArr.length > 0 && departmentArr[0].about}
            </p>

            <h3>More links</h3>
            <a href="https://www.researchgate.net/profile/Abu_Kowsar">ReseachGate</a><br></br>
            <a href="https://scholar.google.com/citations?hl=en&user=H0NPcAoAAAAJ">Google Scholar</a><br></br>
            <a href=" https://orcid.org/0000-0003-2395-7932">ORCID</a>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-9">
                <div className="row">
                <div className="col">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Academic Background
              </button>
              <ul className="dropdown-menu" name="department">
                <table border="2px" >
                <tr>
                {educationArr.map((option) => (
                        <option value={option} name="department"> 
                            <td >{option.degreeName} ,</td>
                            <td>{option.board} ,</td>
                            <td>{option.group} ,</td>
                            <td>{option.passingYear}</td>
                        </option>
                        ))}
                         </tr>
                </table>
              </ul>
            </div>
          </div>
          <div className="col">
          <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Experience
  </button>
  <ul className="dropdown-menu">
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Job Experience");set_modal_body(jobArr.length===0? "Nothing to Show" :jobArr.map((arrel)=><li>{arrel.description}</li>))}}>Job Experience</li>
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Research Experience");set_modal_body(departmentArr.length===0? "Nothing to Show" :departmentArr[0].researchExperience)}}>Research Experience</li>
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Research Experience");set_modal_body(departmentArr.length===0? "Nothing to Show" :departmentArr[0].thesisSupervise)}}>Thesis Supervisor</li>
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Research Experience");set_modal_body(departmentArr.length===0? "Nothing to Show" :departmentArr[0].affilation)}}>Affiliation</li>
  </ul>
</div>
          </div>
          <div className="col">
          <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Research
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="/">Research Interest</a></li>
    <li><a className="dropdown-item" href="/">research Projects</a></li>
  </ul>
</div>
          </div>
          <div className="col">
          <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Publication
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="/">Article</a></li>
    <li><a className="dropdown-item" href="/">Conference Proceeding</a></li>
    <li><a className="dropdown-item" href="/">Book Chapter</a></li>
    <li><a className="dropdown-item" href="/">Book</a></li>
    <li><a className="dropdown-item" href="/">Patent</a></li>
    <li><a className="dropdown-item" href="/">Technical Note</a></li>
    <li><a className="dropdown-item" href="/">Copyright</a></li>
  </ul>
</div>
          </div>
          <div className="col">
          <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Award & Grant
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="/">Award</a></li>
    <li><a className="dropdown-item" href="/">Grant</a></li>
  </ul>
</div>
          </div>
                </div>
            </div>
          
        </div>
      </div>

         {/* // <!-- Button trigger modal --> */}
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

{/* // <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{modal_title}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="container">
             {modal_body}
        </div>
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div><br/><br/><br/>
<Footer/>
    </>
  );
}
