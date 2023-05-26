import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "./CookiesHandle";

function EducationInfo() {
  const [educationInfo, setEducationInfo] = useState([
    {
      degree: "",
      group: "",
      board: "",
      passingYear: "",
      result: "",
      distinction: "",
      cookie: "",
    },
  ]);
  const [cookie, setCookie] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const nextPage  = async (e) => {
    const co = await getCookie('my_cookies');
    setCookie(co);
    educationInfo[0].cookie = co;
    console.log(cookie);
    if(cookie){
      e.preventDefault();
      try {
        console.log("in the rey");
        await axios.post("http://localhost:3001/app/setEducationInfo", educationInfo);
        navigate('/education');
      } catch (err) {
        setError(err.response.data);
      }
    }
    else{
      console.log("Invalid")
      setError("Invalid access");
    }
  };

  const handleEducationInfoChange = (index, event) => {
    const values = [...educationInfo];
    values[index][event.target.name] = event.target.value;
    setEducationInfo(values);
  };

  const addEducation = () => {
    setEducationInfo([
      ...educationInfo,
      {
        degree: "",
        group: "",
        board: "",
        passingYear: "",
        result: "",
        distinction: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const values = [...educationInfo];
    values.splice(index, 1);
    setEducationInfo(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Education Info:", educationInfo);
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Education Information</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        {educationInfo.map((education, index) => (
          <div className="mb-4" key={index}>
            <div >
              <strong> <h4 >Degree {index + 1}</h4></strong> <hr/>
              <div className="form-row">
                <div className="form-group p-2">
                  <label htmlFor={`degree${index}`}>Degree</label>
                  <input
                    type="text"
                    
                    id={`degree${index}`}
                    name="degree"
                    value={education.degree}
                    onChange={(event) =>
                      handleEducationInfoChange(index, event)
                    }
                  />
                </div>
                <div className="form-group p-2">
                  <label htmlFor={`group${index}`}>Group/Department</label>
                  <input
                    type="text"
                    
                    id={`group${index}`}
                    name="group"
                    value={education.group}
                    onChange={(event) =>
                      handleEducationInfoChange(index, event)
                    }
                  />
                </div>
                <div className="form-group p-2">
                  <label htmlFor={`board${index}`}>Board/University</label>
                  <input
                    type="text"
                    
                    id={`board${index}`}
                    name="board"
                    value={education.board}
                    onChange={(event) =>
                      handleEducationInfoChange(index, event)
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group p-2">
                  <label htmlFor={`passingYear${index}`}>Passing Year</label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    id={`passingYear${index}`}
                    name="passingYear"
                    value={education.passingYear}
                    onChange={(event) =>
                      handleEducationInfoChange(index, event)
                    }
                  />
                </div>
                <div className="form-group p-2">
                  <label htmlFor={`result${index}`}>Result</label>
                  <input
                    type="text"
                    
                    id={`result${index}`}
                    name="result"
                    value={education.result}
                    onChange={(event) =>
                      handleEducationInfoChange(index, event)
                    }
                  />
                </div>
                <div className="form-group p-2">
                  <label htmlFor={`distinction${index}`}>Distinction</label>
                  <input
                    type="text"
                    
                    id={`distinction${index}`}
                    name="distinction"
                    value={education.distinction}
                    onChange={(event) =>
                      handleEducationInfoChange(index, event)
                    }
                  />
                </div>
              </div>
              {educationInfo.length !== 1 && (
                <div className="text-center">
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div>
          <button className="btn btn btn-outline-light mr-2" onClick={addEducation}>
            Add Another Degree
          </button>
          <br/><center>
          {/* @sakib  onlcick kore action/navigate korte hobe*/}
          <button type="button" className="m-2 btn btn-outline-light">
            Save Data
          </button>
          <button type="submit" className="m-2 btn btn-outline-light">
            Go to Next Page
          </button>
        </center>
        </div>
      </form>
    </div>
    </div>
  );
}

export default EducationInfo;
