import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSetCookie } from "./CookiesHandle";

function EducationInfo() {
  const [educationInfo, setEducationInfo] = useState([
    {
      degree: "",
      group: "",
      board: "",
      passingYear: "",
      result: "",
      distinction: "",
    },
  ]);
  const [info, setInfo] = useState([]);
  const [cookie, setCookie] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  var result;
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
      if (input.cookieID != null) {
        const ID = await axios.post(
          "http://localhost:3001/edit/getEducationInfo",
          input
        );
        setInfo(ID.data);
        //console.log("Here is info:", ID.data);
      }
    };
    handleProfileClick();
  }, [result]);

  useEffect(() => {
    const setUpInfo = () => {
      const HSC = info.length > 0 && info[0].HSC.split("#");
      const Honourse=info.length>0 && info[0].Honourse?.split("#");
      const Masters = info.length > 0 && info[0].Masters.split("#");
      
      const HSCArr=[{degree: HSC[0],group: HSC[1],board: HSC[2],passingYear: HSC[3], result: HSC[4], distinction: HSC[5],},
        {degree: Honourse[0],group:Honourse[1],board: Honourse[2],passingYear: Honourse[3], result: Honourse[4], distinction: Honourse[5],},
        {degree: Masters[0],group: Masters[1],board: Masters[2],passingYear: Masters[3], result: Masters[4], distinction: Masters[5],},
        ];
        setEducationInfo(HSCArr);
      //console.log("----------------------", educationInfo);
    };
    setUpInfo();
  },[info]);

  const nextPage = async (e) => {     
    navigate("/education");
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
    const educationInfoString = educationInfo
    .map((info) =>
      Object.values(info)
        .filter((value) => value !== "")
        .join("#")
    )
    .join("##");
    const educationArr = educationInfoString.split('##');
    console.log(educationArr,"............",educationInfoString);
    axios.post(
      "http://localhost:3001/edit/setEducationInfo",     //profile.education
      {educationArr: educationArr,
      ID:info[0].ID}
    );
  };

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        <center>
          <h4>Education Information</h4>
        </center>{" "}
        <hr /> <br />
        <form onSubmit={handleSubmit}>
          {educationInfo.map((education, index) => (
            <div className="mb-4" key={index}>
              <div>
                <strong>
                  {" "}
                  <h4>Degree {index + 1}</h4>
                </strong>{" "}
                <hr />
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
            <button
              className="btn btn btn-outline-light mr-2"
              onClick={addEducation}
            >
              Add Another Degree
            </button>
            <br />
            <center>
              {/* @sakib  onlcick kore action/navigate korte hobe*/}
              <button type="button" className="m-2 btn btn-outline-light" onClick={handleSubmit}>
                Save Data
              </button>
              <button type="submit" className="m-2 btn btn-outline-light" onClick={nextPage}>
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
