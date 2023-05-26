import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { getCookie } from "./CookiesHandle";
import Navbar from "../Components/Navbar";

function PersonalInfoForm() {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [cookie, setCookie] = useState("");
  const [error, setError] = useState(null);
  const [researchExperienceList, setResearchExperienceList] = useState([
    { value: "" },
  ]);
  const [thesisSupervisionList, setThesisSupervisionList] = useState([
    { value: "" },
  ]);
  const [professionalAffiliationList, setProfessionalAffiliationList] =
    useState([{ value: "" }]);
    var result,infoArr,nameD;
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      cookie: "",
    });
  
    useEffect(() => {
      const handleInfo = async () => {
        try {
          console.log("here in handle");
          const co = await getCookie('my_cookies');
          setCookie(co);
          inputs.cookie = cookie;
          console.log("here in cookie ",inputs.cookie);
          result = await axios.post("http://localhost:3001/app/getPersonalInfo",inputs);
          console.log("after in handle");
          infoArr = result.data[0];
          nameD = infoArr.name;
        } catch (err) {
          console.log("error occur");
        }
      };
      handleInfo();
    }, []); 

  const handleResearchExperienceChange = (index, event) => {
    const values = [...researchExperienceList];
    values[index].value = event.target.value;
    setResearchExperienceList(values);
  };


  const handleThesisSupervisionChange = (index, event) => {
    const values = [...thesisSupervisionList];
    values[index].value = event.target.value;
    setThesisSupervisionList(values);
  };

  const handleProfessionalAffiliationChange = (index, event) => {
    const values = [...professionalAffiliationList];
    values[index].value = event.target.value;
    setProfessionalAffiliationList(values);
  };

  const handleAddResearchExperience = () => {
    const values = [...researchExperienceList];
    values.push({ value: "" });
    setResearchExperienceList(values);
  };

  const handleAddThesisSupervision = () => {
    const values = [...thesisSupervisionList];
    values.push({ value: "" });
    setThesisSupervisionList(values);
  };

  const handleAddProfessionalAffiliation = () => {
    const values = [...professionalAffiliationList];
    values.push({ value: "" });
    setProfessionalAffiliationList(values);
  };

  const personalInfo = {
    name,
    fatherName,
    motherName,
    birthDate,
    gender,
    nationalId,
    researchExperienceList,
    thesisSupervisionList,
    professionalAffiliationList,
    cookie,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personalInfo = {
      name,
      fatherName,
      motherName,
      birthDate,
      gender,
      nationalId,
      researchExperienceList,
      thesisSupervisionList,
      professionalAffiliationList,
      cookie,
    };
    console.log(personalInfo);
  };

  


  const nextPage  = async (e) => {
    setCookie(getCookie('my_cookies'));
    console.log(cookie);
    if(cookie){
      e.preventDefault();
      try {
        console.log("in the rey");
        await axios.post("http://localhost:3001/app/setPersonalInfo", personalInfo);
        navigate('/education');
      } catch (err) {
        setError(err.response.data);
      }
    }
    else{
      console.log("Invalid")
      setError("Invalid access");
    }
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
    <center><h4>Personal Information</h4></center> <hr /> <br/>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          
          id="name"
          value={name}
          // placeholder={infoArr && infoArr.length > 0 &&infoArr.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fatherName">Father's Name</label>
        <input
          type="text"
          
          id="fatherName"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="motherName">Mother's Name</label>
        <input
          type="text"
          
          id="motherName"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nationalId">National ID</label>
        <input
          type="text"
          
          id="nationalId"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
      </div>
      <br/><center><h4>Your Excellency</h4></center> <hr /> <br/>
      <div className="form-group">
        <label htmlFor="researchExperience">Research Experience</label>
        {researchExperienceList.map((experience, index) => (
          <div key={index}>
            <input
              type="text"
              
              id="researchExperience"
              value={experience.value}
              onChange={(event) => handleResearchExperienceChange(index, event)}
            />
            {index === researchExperienceList.length - 1 && (
              <button type="button" className="m-2 btn btn-outline-light" onClick={handleAddResearchExperience}>
                Add More
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="thesisSupervision">Thesis Supervision</label>
        {thesisSupervisionList.map((thesis, index) => (
          <div key={index}>
            <input
              type="text"
              
              id="thesisSupervision"
              value={thesis.value}
              onChange={(event) => handleThesisSupervisionChange(index, event)}
            />
            {index === thesisSupervisionList.length - 1 && (
              <button type="button" className="m-2 btn btn-outline-light" onClick={handleAddThesisSupervision}>
                Add More
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="professionalAffiliation">
          Professional Affiliation
        </label>
        {professionalAffiliationList.map((affiliation, index) => (
          <div key={index}>
            <input
              type="text"
              
              id="professionalAffiliation"
              value={affiliation.value}
              onChange={(event) =>
                handleProfessionalAffiliationChange(index, event)
              }
            />
            {index === professionalAffiliationList.length - 1 && (
              <button type="button" className="m-2 btn btn-outline-light" onClick={handleAddProfessionalAffiliation}>
                Add More
              </button>
            )}
          </div>
        ))}
      </div>
      <br/><center>
          {/* @sakib  onlcick add kore action/navigate korte hobe*/}
          <button type="button" className="m-2 btn btn-outline-light">
            Save Data
          </button>
          <button type="submit" className="m-2 btn btn-outline-light">
            Go to Next Page
          </button>
        </center>
    </form>
    </div>
    </div>
  );
}

export default PersonalInfoForm;
