import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
import html2pdf from "html2pdf.js";


function ViewProposal() {
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
      result = getSetCookie("my_cookies");
      // if (result == null) {
      //   navigate("/login");
      // }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
  
    // Capture form field values
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
  
    console.log("Generating PDF...");
  
    // Generate the PDF with the applied CSS and form data
    html2pdf()
      .set({
        margin: 10,
        filename: "proposal.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "avoid-all", before: "#page3" },
        formValues: true, // Capture form field values
      })
      .from(form)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        // Attach form field values to the PDF
        pdf.addFormFields(formValues);
  
        // Save the PDF
        pdf.save("proposal.pdf");
      });
  
    // Perform backend submission with the selected researchers
    console.log(selectedResearchers, "-------------");
    const output = await axios.post("http://localhost:3001/RD/storeProposalInfo", {
      ID: info[0].ID,
      Tittle: projectTitle,
      Proposal: "proposal.pdf",
      Teammate: selectedResearchers,
    });
  
    console.log(output.data);
  };
  
  
  
  
  

  return (
    <div  className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Project Proposal Form</h4></center> <hr /> <br/>
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-group">
      <br/><h4><ul><li> Project Introduction</li></ul></h4><hr/><hr/><br/>
        <label className="p-1"

 htmlFor="unitName">Name of the unit:</label>
        {unitName}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="projectTitle">
          Title of the proposed R &amp; D project:
        </label>{projectTitle}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="projectLeaderName">
          Name and designation of Project Leader:
        </label>{projectLeaderName}, ({projectLeaderDesignation})
      </div>
      <br/><br/>
      <div className="row">
       
        <br/><h4><ul><li> Project Assistance Selection</li></ul></h4><hr/><hr/><br/>
          Selected Researchers:
          <ul>
            {selectedResearchers.map((researchers) => (
              // <li key={researchers.ID}>{researchers.Name}</li>
              {researchers}
            ))}
          </ul>

      </div>
      <br/><h4><ul><li> Project Description</li></ul></h4><hr/><hr/><br/>
      <div className="form-group">
        <label className="p-1"

 htmlFor="projectType">
          Type/ Nature of the proposed R &amp; D project:
        </label>
        {projectType}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="projectBackground">
          Introduction/ Background of the proposed R &amp; D project:
        </label>
        {projectBackground}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="projectObjective">Objective:</label>
        {projectObjective}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="socioEconomicImportance">
          Socio-economic importance of the project:
        </label>{socioEconomicImportance}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="professionalTraining">
          Previous Professional Training/ Experience of the project leader
          relevant to the proposed R&amp;D Project:
        </label>{professionalTraining}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="budgetInfo">Budget Information:</label>{budgetInfo}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="otherProjects">
          Name and Progress of another ongoing project of the project (As
          Project leader/ Associate):
        </label>{otherProjects}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="previousPrograms">
          What other R &amp; D program in the related field has already been
          implemented in the BCSIR or elsewhere in the Country or Abroad?:
        </label>{previousPrograms}
      </div>
      <br/><br/><br/><h4><ul><li> Project Plan & Outcome</li></ul></h4><hr/><hr/><br/>
      <div className="form-group">
        <label className="p-1"

 htmlFor="workPlan">
          Work Plan/ Work Packages of the proposed R&amp;D Project:
        </label>{workPlan}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="expectedOutcome">
          The expected outcome of the project:
        </label>{expectedOutcome}
       
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="timeBoundActionPlan">
          Quarterly time-bound action plan for the proposed project:
        </label>{timeBoundActionPlan}
       
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="implementationPeriod">Implementation period:</label>{implementationPeriod}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="projectProgress">Progress of the project:</label>{projectProgress}
      </div>
      <br/><br/><br/><h4><ul><li> Project Facilities</li></ul></h4><hr/><hr/><br/>
      <div className="form-group">
        <label className="p-1"

 htmlFor="researchFacilities">
          Research facilities available in BCSIR:
        </label>{researchFacilities}
      </div>
      <div className="form-group">
        <label className="p-1"

 htmlFor="requiredFacilities">
          A list of facilities ( Equipment/Instrument) will be required in
          addition to the implementation of the R&amp;D projects:
        </label>{requiredFacilities}
        
      </div>
     
      
      
     
      <div className="form-group">
        <label className="p-1"

 htmlFor="additionalInfo">
          Any other Information Relevant to the R&amp;D Project Proposal and its
          Execution:
        </label>{additionalInfo}
        
      </div>
      <br /><br /><br />
     
      
    </form>

    {/* <div>
      <button onClick={handleSubmit}>Submit</button>
    </div> */}
    </div>
    </div>
    
  );
}

export default ViewProposal

;
