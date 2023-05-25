import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";

function ProposalForm() {
  const [info, setInfo] = useState([]);
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   //handle form submission
  // };
  var result;
  const navigate = useNavigate();
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
      console.log(input, "==========");
      if (input.cookieID != null) {
        const ID = await axios.post(
          "http://localhost:3001/app/getPersonalInfo",
          input
        );
        setInfo(ID.data);
        console.log(" Here is info ", ID.data);

        const result2 = await axios.post(
          "http://localhost:3001/RD/getResearcher",
          { dept: ID.data[0].departmentID }
        ); //RD/authority.js
        setResearchers(result2.data, "-------------");
        console.log("cool");
        //  const result3 = await axios.post(
        //   "http://localhost:3001/RD/getProposalInfo",
        //   { dept: ID.data[0].ID }
        // ); //profile/basic.js
      } else {
        console.log("Here are all done");
      }
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

  const handleSubmit = async () => {
    // Perform backend submission with the selected researchers
    console.log(selectedResearchers, "-------------");
    const output = await axios.post(
      "http://localhost:3001/RD/storeProposalInfo",
      {
        ID: info[0].ID,
        Tittle: projectTitle,
        Proposal: "proposal.pdf",
        Teammate: selectedResearchers,
      }
    );

    console.log(output.data);
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="unitName">Name of the unit:</label>
        <input
          type="text"
          className="form-control"
          id="unitName"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectTitle">
          Title of the proposed R &amp; D project:
        </label>
        <input
          type="text"
          className="form-control"
          id="projectTitle"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectLeaderName">
          Name and designation of Project Leader:
        </label>
        <input
          type="text"
          className="form-control"
          id="projectLeaderName"
          value={projectLeaderName}
          onChange={(e) => setProjectLeaderName(e.target.value)}
          //required
        />
        <input
          type="text"
          className="form-control"
          id="projectLeaderDesignation"
          value={projectLeaderDesignation}
          onChange={(e) => setProjectLeaderDesignation(e.target.value)}
          //required
        />
      </div>
      {/* selection preocess */}
      <div className="row">
        <h1>Researcher Selection</h1>
        <div className="col">
          <h3>Available Researchers</h3>
          <ul>
            {availableResearchers.map((researchers) => (
              <li
                key={researchers.ID}
                onClick={() => handleSelectResearcher(researchers)}
              >
                {researchers.Name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h3>Selected Researchers</h3>
          <ul>
            {selectedResearchers.map((researchers) => (
              // <li key={researchers.ID}>{researchers.Name}</li>
              <li
                key={researchers.ID}
                onClick={() => handleRemoveResearcher(researchers)}
              >
                {researchers.Name}
              </li>
            ))}
          </ul>
        </div>
        {/* <button onClick={handleSubmit}>Submit</button> */}
      </div>

      <div className="form-group">
        <label htmlFor="projectType">
          Type/ Nature of the proposed R &amp; D project:
        </label>
        <input
          type="text"
          className="form-control"
          id="projectType"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectBackground">
          Introduction/ Background of the proposed R &amp; D project:
        </label>
        <textarea
          className="form-control"
          id="projectBackground"
          rows="3"
          value={projectBackground}
          onChange={(e) => setProjectBackground(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectObjective">Objective:</label>
        <textarea
          className="form-control"
          id="projectObjective"
          rows="3"
          value={projectObjective}
          onChange={(e) => setProjectObjective(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="socioEconomicImportance">
          Socio-economic importance of the project:
        </label>
        <textarea
          className="form-control"
          id="socioEconomicImportance"
          rows="3"
          value={socioEconomicImportance}
          onChange={(e) => setSocioEconomicImportance(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="professionalTraining">
          Previous Professional Training/ Experience of the project leader
          relevant to the proposed R&amp;D Project:
        </label>
        <textarea
          className="form-control"
          id="professionalTraining"
          rows="3"
          value={professionalTraining}
          onChange={(e) => setProfessionalTraining(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="workPlan">
          Work Plan/ Work Packages of the proposed R&amp;D Project:
        </label>
        <textarea
          className="form-control"
          id="workPlan"
          rows="3"
          value={workPlan}
          onChange={(e) => setWorkPlan(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expectedOutcome">
          The expected outcome of the project:
        </label>
        <textarea
          className="form-control"
          id="expectedOutcome"
          rows="3"
          value={expectedOutcome}
          onChange={(e) => setExpectedOutcome(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="timeBoundActionPlan">
          Quarterly time-bound action plan for the proposed project:
        </label>
        <textarea
          className="form-control"
          id="timeBoundActionPlan"
          rows="3"
          value={timeBoundActionPlan}
          onChange={(e) => setTimeBoundActionPlan(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="researchFacilities">
          Research facilities available in BCSIR:
        </label>
        <textarea
          className="form-control"
          id="researchFacilities"
          rows="3"
          value={researchFacilities}
          onChange={(e) => setResearchFacilities(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="requiredFacilities">
          A list of facilities ( Equipment/Instrument) will be required in
          addition to the implementation of the R&amp;D projects:
        </label>
        <textarea
          className="form-control"
          id="requiredFacilities"
          rows="3"
          value={requiredFacilities}
          onChange={(e) => setRequiredFacilities(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="previousPrograms">
          What other R &amp; D program in the related field has already been
          implemented in the BCSIR or elsewhere in the Country or Abroad?:
        </label>
        <textarea
          className="form-control"
          id="previousPrograms"
          rows="3"
          value={previousPrograms}
          onChange={(e) => setPreviousPrograms(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="implementationPeriod">Implementation period:</label>
        <input
          type="text"
          className="form-control"
          id="implementationPeriod"
          value={implementationPeriod}
          onChange={(e) => setImplementationPeriod(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="budgetInfo">Budget Information:</label>
        <input
          type="text"
          className="form-control"
          id="budgetInfo"
          value={budgetInfo}
          onChange={(e) => setBudgetInfo(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="otherProjects">
          Name and Progress of another ongoing project of the project (As
          Project leader/ Associate):
        </label>
        <input
          type="text"
          className="form-control"
          id="otherProjects"
          value={otherProjects}
          onChange={(e) => setOtherProjects(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectProgress">Progress of the project:</label>
        <input
          type="text"
          className="form-control"
          id="projectProgress"
          value={projectProgress}
          onChange={(e) => setProjectProgress(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="additionalInfo">
          Any other Information Relevant to the R&amp;D Project Proposal and its
          Execution:
        </label>
        <textarea
          className="form-control"
          id="additionalInfo"
          rows="3"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectLeaderSignature">
          Signature of the Project Leader:
        </label>
        <input
          type="text"
          className="form-control"
          id="projectLeaderSignature"
          value={projectLeaderSignature}
          onChange={(e) => setProjectLeaderSignature(e.target.value)}
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="headSignature">
          Signature of the Head of the Uni.:
        </label>
        <input
          type="text"
          className="form-control"
          id="headSignature"
          value={headSignature}
          onChange={(e) => setHeadSignature(e.target.value)}
          //required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>

    {/* <div>
      <button onClick={handleSubmit}>Submit</button>
    </div> */}
    </div>
    
  );
}

export default ProposalForm;
