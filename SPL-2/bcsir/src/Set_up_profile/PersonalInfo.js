import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { getCookie } from "./CookiesHandle";

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


    const navigate = useNavigate();

  

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
        navigate('/join');
      } catch (err) {
        setError(err.response.data);
      }
    }
    else{
      console.log("Invalid")
      setError("Invalid access");
    }
    // 👇️ navigate to /contacts
    
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fatherName">Father's Name</label>
        <input
          type="text"
          className="form-control"
          id="fatherName"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="motherName">Mother's Name</label>
        <input
          type="text"
          className="form-control"
          id="motherName"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          className="form-control"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          className="form-control"
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
          className="form-control"
          id="nationalId"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="researchExperience">Research Experience</label>
        {researchExperienceList.map((experience, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              id="researchExperience"
              value={experience.value}
              onChange={(event) => handleResearchExperienceChange(index, event)}
            />
            {index === researchExperienceList.length - 1 && (
              <button type="button" onClick={handleAddResearchExperience}>
                +
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
              className="form-control"
              id="thesisSupervision"
              value={thesis.value}
              onChange={(event) => handleThesisSupervisionChange(index, event)}
            />
            {index === thesisSupervisionList.length - 1 && (
              <button type="button" onClick={handleAddThesisSupervision}>
                +
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
              className="form-control"
              id="professionalAffiliation"
              value={affiliation.value}
              onChange={(event) =>
                handleProfessionalAffiliationChange(index, event)
              }
            />
            {index === professionalAffiliationList.length - 1 && (
              <button type="button" onClick={handleAddProfessionalAffiliation}>
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary" onClick={nextPage}>
        Next
      </button>
    </form>
    </div>
  );
}

export default PersonalInfoForm;
