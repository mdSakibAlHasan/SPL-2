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
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Trainging Information</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        {trainingInfo.map((training, index) => (
          <div className="mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Training {index + 1}</h4> <hr/>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`type${index}`}>Type</label>
                  <input
                    type="text"
                    
                    id={`type${index}`}
                    name="type"
                    value={training.type}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`title${index}`}>Title</label>
                  <input
                    type="text"
                    
                    id={`title${index}`}
                    name="title"
                    value={training.title}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`institution${index}`}>Institution</label>
                  <input
                    type="text"
                    
                    id={`institution${index}`}
                    name="institution"
                    value={training.institution}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`country${index}`}>Country</label>
                  <input
                    type="text"
                    
                    id={`country${index}`}
                    name="country"
                    value={training.country}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`startDate${index}`}>Start Date</label>
                  <input
                    type="date"
                    
                    id={`startDate${index}`}
                    name="startDate"
                    value={training.startDate}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`endDate${index}`}>End Date</label>
                  <input
                    type="date"
                    
                    id={`endDate${index}`}
                    name="endDate"
                    value={training.endDate}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`grade${index}`}>Grade</label>
                  <input
                    type="text"
                    
                    id={`grade${index}`}
                    name="grade"
                    value={training.grade}
                    onChange={(event) => handleTrainingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`position${index}`}>Position</label>
                  <input
                    type="text"
                    
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
          
        </div>
        <br/><center>
          <button
            type="button"
            className="m-2 btn btn-outline-light"
            onClick={() => addTraining()}
          >
            Add Another Training
          </button>
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

export default TrainingInfo;
