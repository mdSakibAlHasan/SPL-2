import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
import axios from 'axios'; 
import Notification from './Notification'
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
  
  const [profileArr, setprofileArr]=useState([]);
  const [educationArr, seteducationArr]=useState([]);
  const [jobArr, setjobArr]=useState([]);
  const [otherArr, setOtherArr] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isAddResearcher, setIsAddResearcher] = useState(false);
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
      //console.log("I am sakib")
      r = getSetCookie('my_cookies');
      inputs.cookie = r;
      //console.log(r," here are ",inputs.cookie);
    };
    handleCookie();
  }, []); 


  const parseInformation = (researchExperienceArr)=>{
      
  }

  useEffect(() => {
    async function handleDepartment(){
      try {
        //inputs.cookie = getCookie('my_cookies');
        console.log("here");
        
        //inputs.cookie = getCookie('my_cookies');
        result = await axios.post("http://localhost:3001/app/getProfileInfo",inputs);
        console.log("getprofile ",result.data,"all print here");
        setprofileArr(result.data);

       
        result = await axios.post("http://localhost:3001/app/getEducationInfo",inputs);
        //console.log("geteducation", result.data);
        seteducationArr(result.data);
        result = await axios.post("http://localhost:3001/app/getJobInfo",inputs);
        setjobArr(result.data);
        //console.log("getJob ",result.data); 
        result = await axios.post("http://localhost:3001/app/getOtherInfo",inputs);
        setOtherArr(result.data);
        console.log(otherArr," here are all data")
          result = await axios.post("http://localhost:3001/app/cookieAuth",inputs);
          console.log(result.data.id," in if statement")
          if(result.data.id == profileID){
            setIsOwner(true);
          }
    
        result = await axios.post("http://localhost:3001/app/cookieAuth",inputs);
        console.log("ekhane print ses ",result.data);
      } catch (err) {
        console.log("error occur in last");
      }
    };
    handleDepartment();
  }, []); 


   

        useEffect(() => {
          function handlePhoto(){
            import(`./photo/${profileArr.length > 0 && profileArr[0].Photo}`)
            .then(image => setImageSrc(image.default))
            .catch(error => console.error(error, "occur here in photo"));

            if(profileArr.length > 0 && (profileArr[0].type === 'admin' || profileArr[0].type === 'director')){
              setIsAddResearcher(true);
            }
          };
          handlePhoto();
        }, [profileArr]); 


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

  //for popup-box
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  return ( 
    <>
    <div>
    <button onClick={togglePopup} style={{position: 'fixed',top: '80px', right: '20px', padding: '10px', backgroundColor: '#fff', color: '#333', borderRadius: '50%', border: '1px solid #ccc', outline: 'none',cursor: 'pointer', zIndex: '999'}}>
      <i className="fas fa-bell"></i>
      <span style={{ position: 'absolute', top: '2px', right: '5px', backgroundColor: '#f00',color: '#fff', borderRadius: '50%',  padding: '2px 5px',fontSize: '12px'}}>
        5
      </span>
    </button>



      {showPopup && (
        <div className="popup-box">
          <button className="close-button" onClick={togglePopup}>
            <i className="fas fa-times"></i>
          </button>

          <div className="popup-content">
            <h2>Popup Box</h2>
            <Notification/>
            <p>This is a custom popup box component.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>



    {/* <Navbar/> */} <br/><br/><br/><br/>
      <div className="container">
        <div className="row">
          <div className="col">

            <img src={imageSrc} style={{ width: "60%", height: "70%" }} alt="" />{" "}
            <br />{profileArr.length > 0 && profileArr[0].Name} <br /> 
            {profileArr.length > 0 && profileArr[0].Designation} <br />
            {profileArr.length > 0 && profileArr[0].DepartmentName} <br />
            {/* {isOwner && <a  href="/personalInfo" className="btn btn-outline-info" >Edit profile</a>} */}
            
            <br/>
            {isOwner&&
               <div className="dropdown">
               <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Settings
               </button>
               <ul className="dropdown-menu">
                 <li><a className="dropdown-item" href="/personalInfo">Edit Profile</a></li>
                 <li><a className="dropdown-item" href="/changepass">Password Changes</a></li>
                 {isAddResearcher && <li><a className="dropdown-item" href="/Register">Add Researcher</a></li>
                 }{isAddResearcher && <li><a className="dropdown-item" href="/changepass">Remove Researcher</a></li>}
               </ul>
             </div>
            }
            
          </div>
          <div className="col">
            <h3>About Me</h3>
            <p>
            {profileArr.length > 0 && profileArr[0].AboutMe}
            </p>

            <h3>More links</h3>
            <a href={profileArr.length > 0 && profileArr[0].ResearchGateLink}>ReseachGate</a><br></br>
            <a href={profileArr.length > 0 && profileArr[0].GoogleScholarlink}>Google Scholar</a><br></br>
            <a href={profileArr.length > 0 && profileArr[0].Orchidlink}>ORCID</a>
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
                            <td >{option? option[0]: ''} ,</td>
                            <td>{option? option[1]: ''} ,</td>
                            <td>{option? option[2]: ''} ,</td>
                            <td>{option? option[3]: ''}</td>
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
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Job Experience");set_modal_body(jobArr[0].length===0? "Nothing to Show" :jobArr[0].map((arrel)=><li>{arrel}</li>))}}>Job Experience</li>
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Research Experience");set_modal_body(jobArr[0].length===0? "Nothing to Show" :jobArr[0].map((arrel)=><li>{arrel}</li>))}}>Research Experience</li>
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Thesis Supervision");set_modal_body(jobArr[1].length===0? "Nothing to Show" :jobArr[1].map((arrel)=><li>{arrel}</li>))}}>Thesis Supervisor</li>
    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Affilition");set_modal_body(jobArr[2].length===0? "Nothing to Show" :jobArr[2].map((arrel)=><li>{arrel}</li>))}}>Affiliation</li>
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
    <li><a className="dropdown-item" href="/">Research Projects</a></li>
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
  {/* <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Award");set_modal_body(otherArr.length===0? "Nothing to Show" :otherArr.map((arrel)=><li>{ arrel.Type === 'Award'?arrel.Description:arrel}</li>))}}>Award</li> */}
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
    </>
  );
}
