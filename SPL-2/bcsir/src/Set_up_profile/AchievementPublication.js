import React, { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { getSetCookie } from "./CookiesHandle";
import axios from "axios";

const achievementTypes = [
  "Journal Article",
  "Conference Proceeding",
  "Developed Process",
  "Patent",
  "Book",
  "Award",
];

function AchievementPublication() {
  const [info, setInfo] = useState([]);
  const [personalInfo, setpersonalInfo] = useState([]);
  const [achievements, setAchievements] = useState([
    {
      type: "",
      year: "",
      description: "",
    },
  ]);

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
          "http://localhost:3001/app/getPersonalInfo",
          input
        );
        setpersonalInfo(ID.data);
        //console.log('Here is info:', ID.data);
      }
    };
    handleProfileClick();
  }, [result]);

  useEffect(() => {
    const handleProfileClick = async () => {
      const input = {
        cookieID: result,
      };
      input.cookieID = result;
      if (input.cookieID != null) {
        const ID = await axios.post(
          "http://localhost:3001/edit/getAchievementInfo",
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
      if (info !== undefined && info.length > 0) {
        const AchArr = info.map((item) => ({
          type: item.Type,
          year: item.PublishYear,
          description: item.Description,
        }));
        setAchievements(AchArr);
      }
    };

    setUpInfo();
  }, [info]);

  const handleAchievementChange = (index, event) => {
    const values = [...achievements];
    values[index][event.target.name] = event.target.value;
    setAchievements(values);
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        type: "",
        year: "",
        description: "",
      },
    ]);
  };

  const removeAchievement = (index) => {
    const values = [...achievements];
    values.splice(index, 1);
    setAchievements(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Achievements:", achievements); //setAchievement
    axios.post("http://localhost:3001/edit/setAchievement", {
      ID: personalInfo[0].ID,
      achievements: achievements,
    });
  };

  const nextPage = () => {
    navigate("/address");
  };

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        <center>
          <h4>Achievement and Publication</h4>
        </center>{" "}
        <hr /> <br />
        <form onSubmit={handleSubmit}>
          {achievements.map((achievement, index) => (
            <div className="mb-4" key={index}>
              <div>
                <h4>Achievement/Publication {index + 1}</h4>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Type</label>
                  <div className="col-sm-9">
                    <select
                      name="type"
                      value={achievement.type}
                      onChange={(event) =>
                        handleAchievementChange(index, event)
                      }
                    >
                      <option value="">Select Type</option>
                      {achievementTypes.map((type, i) => (
                        <option style={{ color: "black" }} key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Year</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      placeholder="YYYY"
                      min="1959"
                      max="2030"
                      name="year"
                      value={achievement.year}
                      onChange={(event) =>
                        handleAchievementChange(index, event)
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      name="description"
                      value={achievement.description}
                      onChange={(event) =>
                        handleAchievementChange(index, event)
                      }
                    />
                  </div>
                </div>
                {index !== 0 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeAchievement(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="m-2 btn btn-outline-light"
            onClick={addAchievement}
          >
            Add Achievement/Publication
          </button>
          <br />
          <center>
            {/* @sakib  onlcick kore action/navigate korte hobe*/}
            <button
              type="button"
              className="m-2 btn btn-outline-light"
              onClick={handleSubmit}
            >
              Save Data
            </button>

            <button
              type="submit"
              className="m-2 btn btn-outline-light"
              onClick={nextPage}
            >
              Go to Next Page
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default AchievementPublication;
