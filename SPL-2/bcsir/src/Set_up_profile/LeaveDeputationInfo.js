import React, { useState } from "react";

function LeaveDeputationInfo() {
  const [leaveDeputations, setLeaveDeputations] = useState([
    {
      type: "",
      fromDate: "",
      toDate: "",
      tillToday: false,
      description: "",
    },
  ]);

  const handleLeaveDeputationChange = (index, event) => {
    const values = [...leaveDeputations];
    if (event.target.name === "tillToday") {
      values[index][event.target.name] = event.target.checked;
      if (event.target.checked) {
        values[index].toDate = "";
      }
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setLeaveDeputations(values);
  };

  const addLeaveDeputation = () => {
    setLeaveDeputations([
      ...leaveDeputations,
      {
        type: "",
        fromDate: "",
        toDate: "",
        tillToday: false,
        description: "",
      },
    ]);
  };

  const removeLeaveDeputation = (index) => {
    const values = [...leaveDeputations];
    values.splice(index, 1);
    setLeaveDeputations(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Leave/Deputation Info:", leaveDeputations);
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Leave/Deputation Information</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        {leaveDeputations.map((leaveDeputation, index) => (
          <div className="mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Leave/Deputation {index + 1}</h4> <hr/>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Type</label>
                <div className="col-sm-9">
                  <select
                    
                    name="type"
                    value={leaveDeputation.type}
                    onChange={(event) =>
                      handleLeaveDeputationChange(index, event)
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="illness">Illness</option>
                    <option value="maternal">Maternal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">From Date</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    
                    name="fromDate"
                    value={leaveDeputation.fromDate}
                    onChange={(event) =>
                      handleLeaveDeputationChange(index, event)
                    }
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">To Date</label>
                <div className="col-sm-6">
                  <input
                    type="date"
                    
                    name="toDate"
                    value={leaveDeputation.toDate}
                    onChange={(event) =>
                      handleLeaveDeputationChange(index, event)
                    }
                    disabled={leaveDeputation.tillToday}
                  /> 
                </div>
                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="tillToday"
                      checked={leaveDeputation.tillToday}
                      onChange={(event) =>
                        handleLeaveDeputationChange(index, event)
                      }
                    />
                    <label className="form-check-label">Till Today</label>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Description</label>
                <div className="col-sm-9">
                  <textarea
                    
                    name="description"
                    value={leaveDeputation.description}
                    onChange={(event) =>
                      handleLeaveDeputationChange(index, event)
                    }
                  />
                </div>
              </div>
              {leaveDeputations.length !== 1 && (
                <div className="form-group row">
                  <div className="col-sm-9 offset-sm-3">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeLeaveDeputation(index)}
                    >
                      Remove Leave/Deputation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div >
          <div>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={addLeaveDeputation}
            >
              Add Leave/Deputation
            </button>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-9 offset-sm-3">
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
      </form>
    </div>
    </div>
  );
}

export default LeaveDeputationInfo;
