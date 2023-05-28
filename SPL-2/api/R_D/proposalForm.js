import { useState } from 'react';

function ProposalForm() {
  const [unitName, setUnitName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectLeaderName, setProjectLeaderName] = useState('');
  const [projectLeaderDesignation, setProjectLeaderDesignation] = useState('');
  const [researcherNames, setResearcherNames] = useState([]);
  const [projectType, setProjectType] = useState('');
  const [projectBackground, setProjectBackground] = useState('');
  const [projectObjective, setProjectObjective] = useState('');
  const [socioEconomicImportance, setSocioEconomicImportance] = useState('');
  const [professionalTraining, setProfessionalTraining] = useState('');
  const [workPlan, setWorkPlan] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [timeBoundActionPlan, setTimeBoundActionPlan] = useState('');
  const [researchFacilities, setResearchFacilities] = useState('');
  const [requiredFacilities, setRequiredFacilities] = useState('');
  const [previousPrograms, setPreviousPrograms] = useState('');
  const [implementationPeriod, setImplementationPeriod] = useState('');
  const [budgetInfo, setBudgetInfo] = useState('');
  const [otherProjects, setOtherProjects] = useState('');
  const [projectProgress, setProjectProgress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [projectLeaderSignature, setProjectLeaderSignature] = useState('');
  const [headSignature, setHeadSignature] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //handle form submission
  };

  const handleResearcherNameChange = (index, value) => {
    const newResearcherNames = [...researcherNames];
    newResearcherNames[index] = value;
    setResearcherNames(newResearcherNames);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="unitName">Name of the unit:</label>
        <input type="text" className="form-control" id="unitName" value={unitName} onChange={(e) => setUnitName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="projectTitle">Title of the proposed R &amp; D project:</label>
        <input type="text" className="form-control" id="projectTitle" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="projectLeaderName">Name and designation of Project Leader:</label>
        <input type="text" className="form-control" id="projectLeaderName" value={projectLeaderName} onChange={(e) => setProjectLeaderName(e.target.value)} required />
        <input type="text" className="form-control" id="projectLeaderDesignation" value={projectLeaderDesignation} onChange={(e) => setProjectLeaderDesignation(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="researcherNames">Name and designation of Researcher associates:</label>
        {researcherNames.map((name, index) => (
          <div key={index} className="input-group mb-3">
            <input type="text" className="form-control" value={name} onChange={(e) => handleResearcherNameChange(index, e.target




    .value)} />
        <div className="input-group-append">
          <button type="button" className="btn btn-danger" onClick={() => setResearcherNames(researcherNames.filter((_, i) => i !== index))}>Remove</button>
        </div>
      </div>
    ))}
    <button type="button" className="btn btn-secondary" onClick={() => setResearcherNames([...researcherNames, ''])}>Add Researcher</button>
  </div>
  <div className="form-group">
    <label htmlFor="projectType">Type/ Nature of the proposed R &amp; D project:</label>
    <input type="text" className="form-control" id="projectType" value={projectType} onChange={(e) => setProjectType(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="projectBackground">Introduction/ Background of the proposed R &amp; D project:</label>
    <textarea className="form-control" id="projectBackground" rows="3" value={projectBackground} onChange={(e) => setProjectBackground(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="projectObjective">Objective:</label>
    <textarea className="form-control" id="projectObjective" rows="3" value={projectObjective} onChange={(e) => setProjectObjective(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="socioEconomicImportance">Socio-economic importance of the project:</label>
    <textarea className="form-control" id="socioEconomicImportance" rows="3" value={socioEconomicImportance} onChange={(e) => setSocioEconomicImportance(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="professionalTraining">Previous Professional Training/ Experience of the project leader relevant to the proposed R&amp;D Project:</label>
    <textarea className="form-control" id="professionalTraining" rows="3" value={professionalTraining} onChange={(e) => setProfessionalTraining(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="workPlan">Work Plan/ Work Packages of the proposed R&amp;D Project:</label>
    <textarea className="form-control" id="workPlan" rows="3" value={workPlan} onChange={(e) => setWorkPlan(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="expectedOutcome">The expected outcome of the project:</label>
    <textarea className="form-control" id="expectedOutcome" rows="3" value={expectedOutcome} onChange={(e) => setExpectedOutcome(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="timeBoundActionPlan">Quarterly time-bound action plan for the proposed project:</label>
    <textarea className="form-control" id="timeBoundActionPlan" rows="3" value={timeBoundActionPlan} onChange={(e) => setTimeBoundActionPlan(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="researchFacilities">Research facilities available in BCSIR:</label>
    <textarea className="form-control" id="researchFacilities" rows="3" value={researchFacilities} onChange={(e) => setResearchFacilities(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="requiredFacilities">A list of facilities (



    Equipment/Instrument) will be required in addition to the implementation of the R&amp;D projects:</label>
    <textarea className="form-control" id="requiredFacilities" rows="3" value={requiredFacilities} onChange={(e) => setRequiredFacilities(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="previousPrograms">What other R &amp; D program in the related field has already been implemented in the BCSIR or elsewhere in the Country or Abroad?:</label>
    <textarea className="form-control" id="previousPrograms" rows="3" value={previousPrograms} onChange={(e) => setPreviousPrograms(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="implementationPeriod">Implementation period:</label>
    <input type="text" className="form-control" id="implementationPeriod" value={implementationPeriod} onChange={(e) => setImplementationPeriod(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="budgetInfo">Budget Information:</label>
    <input type="text" className="form-control" id="budgetInfo" value={budgetInfo} onChange={(e) => setBudgetInfo(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="otherProjects">Name and Progress of another ongoing project of the project (As Project leader/ Associate):</label>
    <input type="text" className="form-control" id="otherProjects" value={otherProjects} onChange={(e) => setOtherProjects(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="projectProgress">Progress of the project:</label>
    <input type="text" className="form-control" id="projectProgress" value={projectProgress} onChange={(e) => setProjectProgress(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="additionalInfo">Any other Information Relevant to the R&amp;D Project Proposal and its Execution:</label>
    <textarea className="form-control" id="additionalInfo" rows="3" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="projectLeaderSignature">Signature of the Project Leader:</label>
    <input type="text" className="form-control" id="projectLeaderSignature" value={projectLeaderSignature} onChange={(e) => setProjectLeaderSignature(e.target.value)} required />
  </div>
  <div className="form-group">
    <label htmlFor="headSignature">Signature of the Head of the Uni.:</label>
    <input type="text" className="form-control" id="headSignature" value={headSignature} onChange={(e) => setHeadSignature(e.target.value)} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
);
}

export default ProposalForm;