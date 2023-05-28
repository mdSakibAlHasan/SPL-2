import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
// import html2pdf from "html2pdf.js";

function ViewProposal() {
  const location = useLocation();
  const segments = location.pathname.split("/");
  var ProposalID = segments[segments.length - 1];

  // console.log(ProposalID, segments, ",,,,,,,,,,,,,,,///////////");
  const [info, setInfo] = useState([]);
  const [personalInfo, setpersonalInfo] = useState([]);
  const [researcher, setResearchers] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectLeaderName, setProjectLeaderName] = useState("");
  const [projectLeaderDesignation, setProjectLeaderDesignation] = useState("");
  const [researcherNames, setResearcherNames] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [projectBackground, setProjectBackground] = useState("");
  const [projectObjective, setProjectObjective] = useState("");
  const [socioEconomicImportance, setSocioEconomicImportance] = useState("");
  const [professionalTraining, setProfessionalTraining] = useState("");
  const [workPlan, setWorkPlan] = useState("");
  const [expectedOutcome, setExpectedOutcome] = useState("");
  const [timeBoundActionPlan, setTimeBoundActionPlan] = useState("");
  const [researchFacilities, setResearchFacilities] = useState("");
  const [requiredFacilities, setRequiredFacilities] = useState("");
  const [previousPrograms, setPreviousPrograms] = useState("");
  const [implementationPeriod, setImplementationPeriod] = useState("");
  const [budgetInfo, setBudgetInfo] = useState("");
  const [otherProjects, setOtherProjects] = useState("");
  const [projectProgress, setProjectProgress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [projectLeaderSignature, setProjectLeaderSignature] = useState("");
  const [headSignature, setHeadSignature] = useState("");
  const formRef = useRef(null);
  const [formFields, setFormFields] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   //handle form submission
  // };
  var result;
  const navigate = useNavigate();
  useEffect(() => {
    function handleCookie() {
      const segments = location.pathname.split("/");
      ProposalID = segments[segments.length - 1];
      result = getSetCookie("my_cookies");
      if (result == null) {
        navigate("/login");
      }
    }
    handleCookie();
  }, []);

  useEffect(() => {
    const handleProfileClick = async () => {
      const ID = await axios.post("http://localhost:3001/RD/getWholeProposal", {
        ResearchID: ProposalID,
      });
      setInfo(ID.data);
      const ID2 = await axios.post(
        "http://localhost:3001/app/getPersonalInfo",
        { cookieID: result }
      );
      //inputs.ID = ID.data['id'];
      setpersonalInfo(ID2.data);
    };
    handleProfileClick();
  }, [result]);

  const [selectedResearchers, setSelectedResearchers] = useState(researcher);
  const [availableResearchers, setAvailableResearchers] = useState(researcher);
  useEffect(() => {
    const ResearcherInfo = async () => {
      setAvailableResearchers(researcher);
      //setSelectedResearchers(researcher);
      console.log(availableResearchers, "...........");
      const updatedSelectedResearchers = [...selectedResearchers, researcher];
      const updatedAvailableResearchers = availableResearchers.filter(
        (item) => item !== researcher
      );

      //setSelectedResearchers(researcher);
      setAvailableResearchers(researcher);
    };
    ResearcherInfo();
  }, [researcher]);

  // const researchers = ['Researcher 1', 'Researcher 2', 'Researcher 3', 'Researcher 4'];

  const handleSelectResearcher = (researcher) => {
    const updatedSelectedResearchers = [...selectedResearchers, researcher];
    const updatedAvailableResearchers = availableResearchers.filter(
      (item) => item !== researcher
    );

    setSelectedResearchers(updatedSelectedResearchers);
    setAvailableResearchers(updatedAvailableResearchers);
  };

  const handleRemoveResearcher = (researcher) => {
    const updatedAvailableResearchers = [...availableResearchers, researcher];
    const updatedSelectedResearchers = selectedResearchers.filter(
      (item) => item !== researcher
    );

    setSelectedResearchers(updatedSelectedResearchers);
    setAvailableResearchers(updatedAvailableResearchers);
  };

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        <center>
          <h4>Project Proposal Form</h4>
        </center>{" "}
        <hr /> <br />
        <form ref={formRef}>
          <div className="form-group">
            <br />
            <h4>
              <ul>
                <li> Project Introduction</li>
              </ul>
            </h4>
            <hr />
            <hr />
            <br />
            <label className="p-1" htmlFor="unitName">
              Name of the unit:
            </label>
            {info.length > 0 && info[0].uniteName}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="projectTitle">
              Title of the proposed R &amp; D project:
            </label>
            {info.length > 0 && info[0].Title}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="projectLeaderName">
              Name and designation of Project Leader:
            </label>
            {personalInfo.length > 0 && personalInfo[0].Name}, (
            {personalInfo.length > 0 && personalInfo[0].Designation})
          </div>
          <br />
          <br />
          <div className="row">
            <br />
            <h4>
              <ul>
                <li> Project Assistance Selection</li>
              </ul>
            </h4>
            <hr />
            <hr />
            <br />
            Selected Researchers:
            <ul>
              {selectedResearchers.map((researchers) =>
                // <li key={researchers.ID}>{researchers.Name}</li>
                ({ researchers })
              )}
            </ul>
          </div>
          <br />
          <h4>
            <ul>
              <li> Project Description</li>
            </ul>
          </h4>
          <hr />
          <hr />
          <br />
          <div className="form-group">
            <label className="p-1" htmlFor="projectType">
              Type/ Nature of the proposed R &amp; D project:
            </label>
            {info.length > 0 && info[0].projectNature}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="projectBackground">
              Introduction/ Background of the proposed R &amp; D project:
            </label>
            {info.length > 0 && info[0].bckground}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="projectObjective">
              Objective:
            </label>
            {info.length > 0 && info[0].objective}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="socioEconomicImportance">
              Socio-economic importance of the project:
            </label>
            {info.length > 0 && info[0].socioEconomic}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="professionalTraining">
              Previous Professional Training/ Experience of the project leader
              relevant to the proposed R&amp;D Project:
            </label>
            {info.length > 0 && info[0].training.split("#$")}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="budgetInfo">
              Budget Information:
            </label>
            {info.length > 0 && info[0].budget}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="otherProjects">
              Name and Progress of another ongoing project of the project (As
              Project leader/ Associate):
            </label>
            {info.length > 0 && info[0].ongoingProject}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="previousPrograms">
              What other R &amp; D program in the related field has already been
              implemented in the BCSIR or elsewhere in the Country or Abroad?:
            </label>
            {info.length > 0 && info[0].anotherPrograme}
          </div>
          <br />
          <br />
          <br />
          <h4>
            <ul>
              <li> Project Plan & Outcome</li>
            </ul>
          </h4>
          <hr />
          <hr />
          <br />
          <div className="form-group">
            <label className="p-1" htmlFor="workPlan">
              Work Plan/ Work Packages of the proposed R&amp;D Project:
            </label>
            {info.length > 0 && info[0].workPlan}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="expectedOutcome">
              The expected outcome of the project:
            </label>
            {info.length > 0 && info[0].outCome}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="timeBoundActionPlan">
              Quarterly time-bound action plan for the proposed project:
            </label>
            {info.length > 0 && info[0].timeBound}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="implementationPeriod">
              Implementation period:
            </label>
            {info.length > 0 && info[0].implementationPeriod}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="projectProgress">
              Progress of the project:
            </label>
            {0}
          </div>
          <br />
          <br />
          <br />
          <h4>
            <ul>
              <li> Project Facilities</li>
            </ul>
          </h4>
          <hr />
          <hr />
          <br />
          <div className="form-group">
            <label className="p-1" htmlFor="researchFacilities">
              Research facilities available in BCSIR:
            </label>
            {info.length > 0 && info[0].facilities}
          </div>
          <div className="form-group">
            <label className="p-1" htmlFor="requiredFacilities">
              A list of facilities ( Equipment/Instrument) will be required in
              addition to the implementation of the R&amp;D projects:
            </label>
            {info.length > 0 && info[0].requiredfacilities}
          </div>

          <div className="form-group">
            <label className="p-1" htmlFor="additionalInfo">
              Any other Information Relevant to the R&amp;D Project Proposal and
              its Execution:
            </label>
            {info.length > 0 && info[0].others}
          </div>
          <br />
          <br />
          <br />
        </form>
        {/* <div>
      <button onClick={handleSubmit}>Submit</button>
    </div> */}
      </div>
    </div>
  );
}

export default ViewProposal;
