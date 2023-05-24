import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
import ProfileCard from "./ProfileCard";

const CreateDepartment = () => {
  const [info, setInfo] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [previousDepartment, setPreviousDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isNewDepartmentNameSet, setisNewDepartmentNameSet] = useState(false);
  const [isProccedToNextSet, setisProccedToNextSet] = useState(false);
  const [selectedResearcher, setSelectedResearcher] = useState("No one new");
  const [researcherID, setResearcherID] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [departmentNames, setDepartmentNames] = useState([
    "Department 1",
    "Department 2",
    "Department 3",
  ]);
  const [researchers, setResearchers] = useState([]);

  const handleDepartmentSelection = (event) => {
    setPreviousDepartment(event.target.value);
    const department = event.target.value;
    setSelectedDepartment(department);
    // Set the currently selected director based on the selected department
  };

  const handleDepartmentNameChange = (event) => {
    setNewDepartmentName(event.target.value);
    setisNewDepartmentNameSet(true)
  };

  const handleResearcherSelection = (event) => {
    setSelectedResearcher(event.target.value);
  };

  const handleResearcherSelect = (ID, name) => {
    console.log(ID, " here click inside the main function", name);
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
        // console.log(" Here is info ", ID.data);
        if (ID.data[0].type !== "admin") {
          navigate("/login");
        } else {
          const result = await axios.post(
            "http://localhost:3001/api/getDepartment"
          );
          setDepartmentNames(result.data);
          // console.log("cool");
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
      }
    };
    setResearcher();
  }, [selectedDepartment]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post("http://localhost:3001/RD/conformation", {
      ID: info[0].ID,
      pass: adminPassword,
    });
    console.log("Here are match output ", result.data);

    if (result.data === "Password matches") {
      // console.log('New department created:', newDepartmentName);
      // console.log('Selected director:', selectedResearcher, researcherID);
      axios.post("http://localhost:3001/RD/createNewDepartment", {
        ID: researcherID,
        dept: newDepartmentName,
      });

      setNewDepartmentName("");
      setPreviousDepartment("");
      setSelectedResearcher("");
      setAdminPassword("");
      setShowConfirmationModal(false);
    }

    // Reset form fields
  };

  // Generate options for researcher selection based on the selected previous department

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        {/* <h2>Create Department</h2> */}
        <center>
          <h4>Create Department</h4>
        </center>{" "}
        <hr /> <br />
        <form>
          <div className="m-2">
            <label>New Department Name:</label>
            <input
              type="text"
              placeholder="Department Name here"
              value={newDepartmentName}
              onChange={handleDepartmentNameChange}
              required
            />
            <input
              className=" m-2 btn btn-outline-light"
              type="button"
              value="Proceed to Next"
              onClick={() => setisProccedToNextSet(true)}
            />
          </div>
          {isNewDepartmentNameSet && isProccedToNextSet &&(
            <div className="m-2 p-5" >
              <center>
                <h5>Select A New Director for the Department</h5>
              </center>{" "}
              <hr /> <br />
              <div className="m-2">
                <label>Select a Department to find new Director:</label>
                <select
                  value={previousDepartment}
                  onChange={handleDepartmentSelection}
                  required
                >
                  <option value="">Select</option>
                  {departmentNames.map((departmentName, index) => (
                    <option key={index} value={departmentName}>
                      {departmentName}
                    </option>
                  ))}
                </select>
              </div> <hr/>
              
            </div>
          )}
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
              {setResearcherID && isNewDepartmentNameSet && isProccedToNextSet &&(
                <div className="p-5">
                <p>
                  {selectedResearcher} is set as Director of{" "}
                  {newDepartmentName}{" "}
                </p>
              
             
                <input className='m-2 btn btn-outline-light' type="button" value="Create Department" onClick={() => setShowConfirmationModal(true)} />


              </div>)}

              {showConfirmationModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', color:"black"}}>
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
                  Are you sure you want to change the director of {selectedDepartment} to {selectedResearcher}?
                </p>
                <div>
                  <label>Admin Password:</label>
                  <input type="password" style={{border:"1px solid black"}} value={adminPassword} onChange={handleAdminPasswordChange} required />
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
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
};

export default CreateDepartment;
