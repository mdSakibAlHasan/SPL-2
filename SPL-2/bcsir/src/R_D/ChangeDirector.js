import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
import ProfileCard from "./ProfileCard";

const ChangeDirector = () => {
  const [info, setInfo] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDirector, setSelectedDirector] = useState([]);
  const [selectedResearcher, setSelectedResearcher] = useState("No one new");
  const [researcherID, setResearcherID] = useState();
  const [showCurrrentDirector, setshowCurrrentDirector] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentNames, setDepartmentNames] = useState([
    "Department 1",
    "Department 2",
    "Department 3",
  ]);
  const [directors, setDirectors] = useState([
    "Director 1",
    "Director 2",
    "Director 3",
  ]);
  const [researchers, setResearchers] = useState([]);
  const [adminPassword, setAdminPassword] = useState("");

  const handleDepartmentSelection = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setshowCurrrentDirector(true);
    // Set the currently selected director based on the selected department
    // const director = directors.find((dir) => dir === department);
    // setSelectedDirector(director);
  };

  const handleResearcherSelect = (ID, name) => {
    console.log(ID, "-------", name);
    setResearcherID(ID);
    setSelectedResearcher(name);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };

  var result;
  const navigate = useNavigate();
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
        setInfo(ID.data);
        console.log(" Here is info ", ID.data);
        if (ID.data[0].type !== "admin") {
          navigate("/login");
        } else {
          const result = await axios.post(
            "http://localhost:3001/api/getDepartment"
          );
          setDepartmentNames(result.data);
          console.log("cool");
        }
      }
    };
    handleProfileClick();
  }, [result]);

  useEffect(() => {});

  useEffect(() => {
    const setResearcher = async () => {
      if (selectedDepartment) {
        const result = await axios.post(
          "http://localhost:3001/RD/getOnlyRresearcher",
          { dept: selectedDepartment }
        );
        setResearchers(result.data);
        const result2 = await axios.post(
          "http://localhost:3001/RD/previousDirectorInfo",
          { dept: selectedDepartment }
        );
        setSelectedDirector(result2.data);
        console.log(selectedDirector, "---------");
      }
    };
    setResearcher();
  }, [selectedDepartment]);

  // useEffect(()=>{
  //   const getResearcherID = () =>{
  //     researchers.map(option =>{
  //       console.log(option)
  //       if(option.Name === selectedResearcher){
  //         //inputs.ID = option.ID;
  //         setResearcherID(option.ID);
  //       }
  //     })
  //   }
  //   getResearcherID();
  // },[selectedResearcher])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post("http://localhost:3001/RD/conformation", {
      ID: info[0].ID,
      pass: adminPassword,
    });
    console.log("Here are match output ", result.data);

    if (result.data === "Password matches") {
      axios.post("http://localhost:3001/RD/changeDirector", {
        ID: researcherID,
        dept: selectedDepartment,
        dID: selectedDirector[0].ID,
      });
      //need to update
      console.log("Department:", selectedDepartment);
      console.log("Selected Director:", researcherID);
      console.log("Selected Researcher:", selectedResearcher);
      // Reset form fields
      setSelectedDepartment("");
      setSelectedDirector("");
      setSelectedResearcher("");
      setShowConfirmationModal(false);
    }
  };

  // Generate options for department selection
  const departmentOptions = departmentNames.map((departmentName, index) => (
    <option style={{ color: "black" }} key={index} value={departmentName}>
      {departmentName}
    </option>
  ));

  // Generate options for researcher selection
  const researcherOptions = researchers.map((researcher, index) => (
    <option style={{ color: "black" }} key={index} value={researcher.Name}>
      {researcher.Name}
    </option>
  ));

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        {/* <h2>Change Director</h2> */}
        <center>
          <h4>Change Director</h4>
        </center>{" "}
        <hr /> <br />
        <form>
          <div>
            <label>Select Department:</label>
            <select
              value={selectedDepartment}
              onChange={handleDepartmentSelection}
              required
            >
              <option style={{ color: "black" }} value="">
                Select a department
              </option>
              {departmentOptions}
            </select>
          </div>
          <hr />
          <div>
            {selectedDepartment && ( //need to @update idf times remain
              <div>
                <label>Current Director: </label>
                {/* <ProfileCard key={selectedDirector.ID} name={selectedDirector.Name} designation={selectedDirector.Designation} photo={selectedDirector.Photo} ID={selectedDirector.ID} /> */}
                <span>{selectedDirector[0] && selectedDirector[0].Name}</span>{" "}
                <hr /> <br />
              </div>
            )}
          </div>

          {/* <button type="button" onClick={() => setShowConfirmationModal(true)}>
          Change Director
        </button> */}
        </form>
        <div className="container">
          {selectedDepartment && (
            <div className="row">
              <div style={{ display: "flex" }}>
                {researchers.map((user) => (
                  <ProfileCard
                    key={user.ID}
                    name={user.Name}
                    designation={user.Designation}
                    photo={user.Photo}
                    ID={user.ID}
                    dept={selectedDepartment}
                    onClick={handleResearcherSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {setResearcherID && showCurrrentDirector && (
          <p>
            {selectedResearcher} is set as Director of {selectedDepartment}{" "}
          </p>
        )}
        {showCurrrentDirector && (
          <center>
            <input
              className=" m-2 btn btn-outline-light"
              type="button"
              value="Change Director"
              onClick={() => setShowConfirmationModal(true)}
            />
            <br />
          </center>
        )}
        {showConfirmationModal && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block", color: "black" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Action</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowConfirmationModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to change the director of{" "}
                    {selectedDepartment} to {selectedResearcher}?
                  </p>
                  <div>
                    <label>Admin Password:</label>
                    <input
                      type="password"
                      style={{ border: "1px solid black" }}
                      value={adminPassword}
                      onChange={handleAdminPasswordChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowConfirmationModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showConfirmationModal && (
          <div className="modal-backdrop fade show"></div>
        )}
      </div>
    </div>
  );
};

// {selectedDepartment && (
//   <div>
//     <label>Select Researcher:</label>
//     <select value={selectedResearcher} onChange={handleResearcherSelection} required>
//       <option value="">Select a researcher</option>
//       {researcherOptions}
//     </select>
//   </div>
// )}

export default ChangeDirector;
