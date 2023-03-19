import React, { useState } from "react";

function TrainingInfo() {
  const [trainingInfo, setTrainingInfo] = useState([
    {
      type: "",
      title: "",
      institution: "",
      country: "",
      startDate: "",
      endDate: "",
      grade: "",
      position: "",
    },
  ]);

  const handleTrainingInfoChange = (index, event) => {
    const values = [...trainingInfo];
    values[index][event.target.name] = event.target.value;
    setTrainingInfo(values);
  };

  const addTraining = () => {
    setTrainingInfo([
      ...trainingInfo,
      {
        type: "",
        title: "",
        institution: "",
        country: "",
        startDate: "",
        endDate: "",
        grade: "",
        position: "",
      },
    ]);
  };

  const removeTraining = (index) => {
    const values = [...trainingInfo];
    values.splice(index, 1);
    setTrainingInfo(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Training Info:", trainingInfo);
  };

  return (
    <div className="container mt-4">
      <h2>Training Information</h2>
      <form onSubmit={handleSubmit}>
        {trainingInfo.map((training, index) => (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Training {index + 1}</h4>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor={`type${index}`}>Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`type${index}`}
                    name="type"
                    value={training.type}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`title${index}`}>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`title${index}`}
                    name="title"
                    value={training.title}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`institution${index}`}>Institution</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`institution${index}`}
                    name="institution"
                    value={training.institution}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor={`country${index}`}>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`country${index}`}
                    name="country"
                    value={training.country}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`startDate${index}`}>Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`startDate${index}`}
                    name="startDate"
                    value={training.startDate}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`endDate${index}`}>End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`endDate${index}`}
                    name="endDate"
                    value={training.endDate}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor={`grade${index}`}>Grade</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`grade${index}`}
                    name="grade"
                    value={training.grade}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`position${index}`}>Position</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`position${index}`}
                    name="position"
                    value={training.position}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm float-right"
                onClick={() => removeTraining(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => addTraining()}
          >
            Add Training
          </button>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainingInfo;
