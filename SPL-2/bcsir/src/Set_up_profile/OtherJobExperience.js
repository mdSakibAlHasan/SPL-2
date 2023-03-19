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
    <div className="container">
      <h1>Other Job Experience</h1>
      {jobExperience.map((experience) => (
        <div key={experience.id}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Serial No.</label>
            <div className="col-sm-10">
              <p>{experience.id}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Short Job Description
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
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
                className="form-control"
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
                  className="form-control"
                  name="toDate"
                  value={experience.toDate}
                  onChange={(e) => handleJobExperienceChange(experience.id, e)}
                  disabled={experience.present}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      name="present"
                      checked={experience.present}
                      onChange={() => handlePresentChange(experience.id)}
                    />{" "}
                    Till now
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => removeJobExperience(experience.id)}
          >
            Remove
          </button>
          <hr />
        </div>
      ))}
      <button className="btn btn-primary" onClick={() => addJobExperience()}>
        Add Job Experience
      </button>
    </div>
  );
}

export default OtherJobExperience;
