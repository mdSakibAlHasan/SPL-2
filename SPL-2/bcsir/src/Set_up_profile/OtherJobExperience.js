import React, { useState } from "react";

function OtherJobExperience() {
  const [jobExperience, setJobExperience] = useState([
    { id: 1, description: "", fromDate: "", toDate: "", present: false },
  ]);

  const addJobExperience = () => {
    setJobExperience([
      ...jobExperience,
      {
        id: jobExperience.length + 1,
        description: "",
        fromDate: "",
        toDate: "",
        present: false,
      },
    ]);
  };

  const removeJobExperience = (id) => {
    setJobExperience(
      jobExperience.filter((experience) => experience.id !== id)
    );
  };

  const handleJobExperienceChange = (id, e) => {
    const updatedJobExperience = jobExperience.map((experience) => {
      if (experience.id === id) {
        return { ...experience, [e.target.name]: e.target.value };
      }
      return experience;
    });
    setJobExperience(updatedJobExperience);
  };

  const handlePresentChange = (id) => {
    const updatedJobExperience = jobExperience.map((experience) => {
      if (experience.id === id) {
        return { ...experience, present: !experience.present };
      }
      return experience;
    });
    setJobExperience(updatedJobExperience);
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Other Job Experience</h4></center> <hr /> <br/>
      {jobExperience.map((experience) => (
        <div key={experience.id}>
          <div className="form-group row">
            <h4 className="col-sm-">Serial No. {experience.id}</h4> <hr/>
              
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Short Job Description
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                
                name="description"
                value={experience.description}
                onChange={(e) => handleJobExperienceChange(experience.id, e)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">From Date</label>
            <div className="col-sm-10">
              <input
                type="date"
                
                name="fromDate"
                value={experience.fromDate}
                onChange={(e) => handleJobExperienceChange(experience.id, e)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">To Date</label>
            <div className="col-sm-10">
              <div className="input-group">
                <input
                  type="date"
                  
                  name="toDate"
                  value={experience.toDate}
                  onChange={(e) => handleJobExperienceChange(experience.id, e)}
                  disabled={experience.present}
                />
               
                 
                  
              </div>
            </div>
          </div>
          <button
            className="m-2 btn btn-danger"
            onClick={() => removeJobExperience(experience.id)}
          >
            Remove
          </button>
          <hr />
        </div>
      ))}
      <button className="btn btn-outline-light" onClick={() => addJobExperience()}>
        Add Job Experience
      </button>
      <br/><center>
          {/* @sakib  onlcick add kore action/navigate korte hobe*/}
          <button type="button" className="m-2 btn btn-outline-light">
            Save Data
          </button>
          <button type="submit" className="m-2 btn btn-outline-light">
            Go to Next Page
          </button>
        </center>
    </div>
    </div>
  );
}

export default OtherJobExperience;
