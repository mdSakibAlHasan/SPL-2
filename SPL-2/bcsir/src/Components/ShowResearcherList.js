import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoShowCard from "./InfoShowCard";

function ShowResearcherList() {
  const [departmentArr, setdepartmentsArr] = useState([]);
  const [inputs, setInputs] = useState({
    dept: "",
  });
  const [researcherArr, setresearcherArr] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [director, setDirector] = useState();

  useEffect(() => {
    const handleDepartment = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3001/api/getDepartment" //controll/auth.js
        );
        setdepartmentsArr(result.data);
      } catch (err) {
        console.log("error occurred");
      }
    };
    handleDepartment();
  }, []);

  const handleResearcher = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3001/app/getResearcher", //profile/basic.js
        { dept: selectedDepartment }
      );
      setresearcherArr(result.data);
      console.log(researcherArr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  useEffect(() => {
    if (selectedDepartment) {
      const setDIrectorName = async () => {
        const result2 = await axios.post(
          "http://localhost:3001/app/getConnectedResearcher", //profile/basic.js
          { ID: 11003 }
        );
        setDirector(result2.data);
        console.log();
      };

      handleResearcher();
      setDIrectorName();
    }
  }, [selectedDepartment]);

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        <center>
          <h3>
            <strong>Department wise Info</strong>
          </h3>
        </center>
        <hr />
        <div className="form-group">
          <label htmlFor="departmentSelect" className="m-1">
            Select a Department
          </label>
          <select
            id="departmentSelect"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">--</option>
            {departmentArr.map((option) => (
              <option key={option} value={option} style={{ color: "black" }}>
                {option}
              </option>
            ))}
          </select>
          <hr />
          <br />
          <br />
        </div>
        {selectedDepartment && (
          <div className="row">
            <div style={{ display: "flex" }}>
              {researcherArr.map((user) => (
                <InfoShowCard
                  key={user.ID}
                  name={user.Name}
                  designation={user.Designation}
                  photo={user.Photo}
                  ID={user.ID}
                  type={user.type}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowResearcherList;
