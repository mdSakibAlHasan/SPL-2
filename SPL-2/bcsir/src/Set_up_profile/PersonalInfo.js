import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "./CookiesHandle";
import { getSetCookie } from "./CookiesHandle";
import Navbar from "../Components/Navbar";

function PersonalInfoForm() {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [cookie, setCookie] = useState("");
  const [error, setError] = useState(null);
  const [googleScholar, setGoogleScholar] = useState("");
const [researchGate, setResearchGate] = useState("");
const [orchidProfile, setOrchidProfile] = useState("");

  const [researchExperienceList, setResearchExperienceList] = useState([
    { value: "" },
  ]);
  const [thesisSupervisionList, setThesisSupervisionList] = useState([
    { value: "" },
  ]);
  const [professionalAffiliationList, setProfessionalAffiliationList] =
    useState([{ value: "" }]);
  var result, infoArr, nameD;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    cookie: "",
  });

  useEffect(() => {
    function handleCookie() {
      result = getSetCookie("my_cookies");
      if (result == null) {
        navigate("/login");
      }
    }
    handleCookie();
  }, []);

  useEffect(() => {
    const handleProfileClick = async () => {
      const input = {
        cookieID: result,
      };
      input.cookieID = result;
      if (input.cookieID != null) {
        const ID = await axios.post(
          "http://localhost:3001/edit/getProfileInfo",
          input
        );
        setInfo(ID.data);
        console.log("Here is info:", ID.data);
      }
    };
    handleProfileClick();
  }, [result]);


  useEffect(() => {
    const setUpInfo = () => {
      if (info !== null) {
        const dateObject = new Date(info.length > 0 && info[0].BirthDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const convertedDate = `${year}/${month}/${day}`;
        console.log(convertedDate);

        //console.log(info[0]);
        setName(info.length > 0 && info[0].Name);
        setFatherName(info.length > 0 && info[0].FatherName);
        setMotherName(info.length > 0 && info[0].MotherName);
        setBirthDate(convertedDate);
        setGender(info.length > 0 && info[0].BirthDate);
        setNationalId(info.length > 0 && (info[0].NationalID && "null"));

        const ResearchExp = (info.length > 0 && info[0].ResearchExperience.split("#$"));
        //console.log(ResearchExp,"----------------------");
        const convertedArray = ResearchExp.length>0 && ResearchExp.map((item, index) => {
          return { value: item };
        });
        //console.log(convertArray)
        setResearchExperienceList(convertedArray);
        const ThesisSup = (info.length > 0 && info[0].ThesisSupervision.split("#$"));
        const ThesisSupArr =ThesisSup.length>0 && ThesisSup.map((item, index) => {
          return { value: item };
        });
        setThesisSupervisionList(ThesisSupArr);
        const ProfessionalAff = (info.length > 0 && info[0].ProfessionalAffiliation.split("#$"));
        const ProfessionalAffArr =ProfessionalAff.length>0 && ProfessionalAff.map((item, index) => {
          return { value: item };
        });
        setProfessionalAffiliationList(ProfessionalAffArr);
      }
    };
    setUpInfo();
  }, [info]);

  const handleResearchExperienceChange = (index, event) => {
    const values = [...researchExperienceList];
    values[index].value = event.target.value;
    console.log(values, "-----");
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
    photo,
    googleScholar,
    researchGate,
    orchidProfile,
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const researchArray = researchExperienceList.map(item => item.value);
    const thesisSupArray = thesisSupervisionList.map(item => item.value);
    const proAffArray = professionalAffiliationList.map(item => item.value);
    const output =  axios.post("http://localhost:3001/app/getMaxNotificationID",{
      Name: name,
      fatherName: fatherName,
      motherName: motherName,
      birthDate: birthDate,
      gender: gender,
      nationalId: nationalId,
      researchExperienceList: researchArray,
      thesisSupervisionList: thesisSupArray,
      professionalAffiliationList: proAffArray
    });
    console.log(output.data);
  };

  const nextPage = async (e) => {
    setCookie(getCookie("my_cookies"));
    console.log(cookie);
    if (cookie) {
      e.preventDefault();
      try {
        console.log("in the rey");
        await axios.post(
          "http://localhost:3001/app/setPersonalInfo",
          personalInfo
        );
        navigate("/education");
      } catch (err) {
        setError(err.response.data);
      }
    } else {
      console.log("Invalid");
      setError("Invalid access");
    }
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
    <center><h4>Personal Information</h4></center> <hr /> <br/>
    <form onSubmit={handleSubmit}>
      <div className="form-group m-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          
          id="name"
          value={name}
          // placeholder={infoArr && infoArr.length > 0 &&infoArr.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group m-2">
        <label htmlFor="fatherName">Father's Name</label>
        <input
          type="text"
          
          id="fatherName"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
      </div>
      <div className="form-group m-2">
  <label htmlFor="photo">Photo</label>
  <input
    type="file"
    id="photo"
    onChange={(e) => setPhoto(e.target.files[0])}
  />
</div>

      <div className="form-group m-2">
        <label htmlFor="motherName">Mother's Name</label>
        <input
          type="text"
          
          id="motherName"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />
      </div>
      <div className="form-group m-2">
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="form-group m-2">
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
      <div className="form-group m-2">
        <label htmlFor="nationalId">National ID</label>
        <input
          type="text"
          
          id="nationalId"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
      </div>
      <br/><center><h4>Your Excellency</h4></center> <hr /> <br/>
      <div className="form-group m-2">
        <label htmlFor="researchExperience">Research Experience</label>
        {researchExperienceList && researchExperienceList.map((experience, index) => (
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
      <div className="form-group m-2">
        <label htmlFor="thesisSupervision">Thesis Supervision</label>
        {thesisSupervisionList && thesisSupervisionList.map((thesis, index) => (
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
      <div className="form-group m-2">
        <label htmlFor="professionalAffiliation">
          Professional Affiliation
        </label>
        {professionalAffiliationList && professionalAffiliationList.map((affiliation, index) => (
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
      <div className="form-group m-2">
  <label htmlFor="googleScholar">Google Scholar Link</label>
  <input
    type="text"
    id="googleScholar"
    value={googleScholar}
    onChange={(e) => setGoogleScholar(e.target.value)}
  />
</div>

<div className="form-group m-2">
  <label htmlFor="researchGate">ResearchGate Link</label>
  <input
    type="text"
    id="researchGate"
    value={researchGate}
    onChange={(e) => setResearchGate(e.target.value)}
  />
</div>

<div className="form-group m-2">
  <label htmlFor="orchidProfile">ORCID Profile Link</label>
  <input
    type="text"
    id="orchidProfile"
    value={orchidProfile}
    onChange={(e) => setOrchidProfile(e.target.value)}
  />
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
