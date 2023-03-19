import React, { useState } from "react";

function PostingInfo() {
  const [postingInfo, setPostingInfo] = useState([
    {
      designation: "",
      office: "",
      district: "",
      upazila: "",
      fromDate: "",
      toDate: "",
      tillToday: false,
    },
  ]);

  const handlePostingInfoChange = (index, event) => {
    const values = [...postingInfo];
    if (event.target.name === "tillToday") {
      values[index][event.target.name] = event.target.checked;
      values[index]["toDate"] = "";
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setPostingInfo(values);
  };

  const addPosting = () => {
    setPostingInfo([
      ...postingInfo,
      {
        designation: "",
        office: "",
        district: "",
        upazila: "",
        fromDate: "",
        toDate: "",
        tillToday: false,
      },
    ]);
  };

  const removePosting = (index) => {
    const values = [...postingInfo];
    values.splice(index, 1);
    setPostingInfo(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Posting Info:", postingInfo);
  };

  return (
    <div className="container mt-4">
      <h2>Posting Information</h2>
      <form onSubmit={handleSubmit}>
        {postingInfo.map((posting, index) => (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Posting {index + 1}</h4>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor={`designation${index}`}>Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`designation${index}`}
                    name="designation"
                    value={posting.designation}
                    onChange={(event) => handlePostingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor={`office${index}`}>Office</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`office${index}`}
                    name="office"
                    value={posting.office}
                    onChange={(event) => handlePostingInfoChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor={`district${index}`}>District</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`district${index}`}
                    name="district"
                    value={posting.district}
                    onChange={(event) => handlePostingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`upazila${index}`}>Upazila</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`upazila${index}`}
                    name="upazila"
                    value={posting.upazila}
                    onChange={(event) => handlePostingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`fromDate${index}`}>From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id={`fromDate${index}`}
                    name="fromDate"
                    value={posting.fromDate}
                    onChange={(event) => handlePostingInfoChange(index, event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor={`toDate${index}`}>To Date</label>
                  <div className="d-flex">
                    <input
                      type="date"
                      className="form-control"
                      id={`toDate${index}`}
                      name="toDate"
                      value={posting.toDate}
                      onChange={(event) =>
                        handlePostingInfoChange(index, event)
                      }
                      disabled={posting.tillToday}
                    />
                    <div className="form-check ml-3 mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`tillToday${index}`}
                        name="tillToday"
                        checked={posting.tillToday}
                        onChange={(event) =>
                          handlePostingInfoChange(index, event)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`tillToday${index}`}
                      >
                        Till Today
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-2">
                  <button
                    type="button"
                    className="btn btn-danger mt-4"
                    onClick={() => removePosting(index)}
                  >
                    Remove Posting
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={addPosting}
          >
            Add Posting
          </button>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default PostingInfo;
