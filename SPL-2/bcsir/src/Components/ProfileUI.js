import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";
import axios from "axios";
import Notification from "./Notification";
//import { getID } from "../App";
import RG from "./photo/reseachgate.png";
import GS from "./photo/googleshcholar.png";
import OC from "./photo/orcid.jpg";
// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

export default function Profile(props) {
  const location = useLocation();
  const segments = location.pathname.split("/");
  const profileID = segments[segments.length - 1];
  console.log(profileID);
  console.log(profileID);
  var result, r;
  const [inputs, setInputs] = useState({
    ID: "",
    cookie: "",
  });

  const [profileArr, setprofileArr] = useState([]);
  const [educationArr, seteducationArr] = useState([]);
  const [jobArr, setjobArr] = useState([]);
  const [otherArr, setOtherArr] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isAddResearcher, setIsAddResearcher] = useState(false);
  inputs.ID = profileID;

  // const getCookie = (name) => {
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split('; ');
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split('=');
  //     if (cookie[1] === name) {
  //       inputs.cookie = cookie[0];
  //       return cookie[0];
  //     }
  //   }
  //   return null;
  // }      //jodi cookie kaj na kore taile eta commemt out koro

  useEffect(() => {
    function handleCookie() {
      //console.log("I am sakib")
      r = getSetCookie("my_cookies");
      inputs.cookie = r;
      //console.log(r," here are ",inputs.cookie);
    }
    handleCookie();
  }, []);

  const parseInformation = (researchExperienceArr) => {};

  useEffect(() => {
    async function handleDepartment() {
      try {
        //inputs.cookie = getCookie('my_cookies');
        console.log("here");

        //inputs.cookie = getCookie('my_cookies');
        result = await axios.post(
          "http://localhost:3001/app/getProfileInfo",
          inputs
        );
        console.log("getprofile ", result.data, "all print here");
        setprofileArr(result.data);

        result = await axios.post(
          "http://localhost:3001/app/getEducationInfo",
          inputs
        );
        //console.log("geteducation", result.data);
        seteducationArr(result.data);
        result = await axios.post(
          "http://localhost:3001/app/getJobInfo",
          inputs
        );
        setjobArr(result.data);
        //console.log("getJob ",result.data);
        result = await axios.post(
          "http://localhost:3001/app/getOtherInfo",
          inputs
        );
        setOtherArr(result.data);
        console.log(otherArr, " here are all data");
        result = await axios.post(
          "http://localhost:3001/app/cookieAuth",
          inputs
        );
        console.log(result.data.id, " in if statement");
        if (result.data.id == profileID) {
          setIsOwner(true);
        }

        result = await axios.post(
          "http://localhost:3001/app/cookieAuth",
          inputs
        );
        console.log("ekhane print ses ", result.data);
      } catch (err) {
        console.log("error occur in last");
      }
    }
    handleDepartment();
  }, []);

  useEffect(() => {
    function handlePhoto() {
      import(`./photo/${profileArr.length > 0 && profileArr[0].Photo}`)
        .then((image) => setImageSrc(image.default))
        .catch((error) => console.error(error, "occur here in photo"));

      if (
        profileArr.length > 0 &&
        (profileArr[0].type === "admin" || profileArr[0].type === "director")
      ) {
        setIsAddResearcher(true);
      }
    }
    handlePhoto();
  }, [profileArr]);

  const prearr = ["a", "b", "c", "d", "a"];
  const photo = props.photo;
  const [arr, setarr] = useState([]);
  const [modal_title, set_modal_title] = useState();
  const [modal_body, set_modal_body] = useState();
  const [notificationRemain, setNotificationRemain] = useState(0);
  const [maxID, setMaxID] = useState();

  const updateArr = () => {
    prearr.forEach((element) => {
      setarr(...arr, element);
    });
    // setarr();
    console.log(arr);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // setIsLogin(false);
      handleRefresh();
    } catch (err) {
      console.log("here error in navbar");
    }
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const setNotificationNumber = async () => {
      const output = await axios.post(
        "http://localhost:3001/app/getMaxNotificationID",
        { deptID: profileArr[0].departmentID }
      );
      //console.log(output.data[0].max_id,"///////////////////////");
      setNotificationRemain(
        output.data[0].max_id - profileArr[0].readNotification
      );
      setMaxID(output.data[0].max_id);
    };
    setNotificationNumber();
  });

  //for popup-box
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="full_page_normal p-5 shade1">
        <div className="shade2 p-2 rounded">
          <div>
            {isOwner && (
              <div
                className="dropdown mx-5 "
                style={{
                  position: "fixed",
                  top: "80px",
                  right: "20px",
                  padding: "10px",
                  // backgroundColor: "#fff",
                  color: "#333",
                  borderRadius: "50%",
                  // border: "1px solid #ccc",
                  outline: "none",
                  cursor: "pointer",
                  zIndex: "999",
                }}
              >
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {profileArr.length > 0 && profileArr[0].Name}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      onClick={handleLogout}
                      className="dropdown-item"
                      href="/personalInfo"
                    >
                      Log Out
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/personalInfo">
                      Edit Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/changepass">
                      Password Changes
                    </a>
                  </li>
                  <li>
                    {" "}
                    {/*  //check condition for declare call */}
                    <a className="dropdown-item" href="/submitProposal">
                      Proposal Submit
                    </a>
                  </li>
                  <li>
                    {" "}
                    {/*  //check condition for declare call */}
                    <a className="dropdown-item" href="/projectList">
                      Ongoing Project List
                    </a>
                  </li>
                  {profileArr[0].type === "PI" && (
                    <>
                      <li>
                        <a className="dropdown-item" href="/declareCall">
                          Declare a call
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="/editdateline">
                          Edit Dateline
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="/finalApprove">
                          Approve Final project
                        </a>
                      </li>
                    </>
                  )}
                  {profileArr[0].type === "admin" && (
                    <>
                      <li>
                        <a className="dropdown-item" href="/createDepartment">
                          Create a Department
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="/changeDirector">
                          Change Director
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/setcommittee">
                          Add RC Head
                        </a>
                      </li>
                    </>
                  )}
                  {(profileArr[0].type === "admin" ||
                    profileArr[0].type === "Director") && (
                    <li>
                      <a className="dropdown-item" href="/addRemoveResearcher">
                        Add or Remove Researcher
                      </a>
                    </li>
                  )}
                  {(profileArr[0].type === "PI" ||
                    profileArr[0].type === "Director") && (
                    <li>
                      <a className="dropdown-item" href="/setcommittee">
                        Change RDHead
                      </a>
                    </li>
                  )}
                  {(profileArr[0].type === "PI" ||
                    profileArr[0].type === "Director" ||
                    profileArr[0].type === "admin") && (
                    <li>
                      <a className="dropdown-item" href="/sendNotification">
                        Send a Notification
                      </a>
                    </li>
                  )}
                  {(profileArr[0].type === "PI" ||
                    profileArr[0].type === "Director" ||
                    profileArr[0].type === "RDHead") && (
                    <li>
                      <a className="dropdown-item" href="/approveProposal">
                        Approve Proposal
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
            {isOwner && (
              <button
                className=""
                onClick={togglePopup}
                style={{
                  position: "fixed",
                  top: "80px",
                  right: "20px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  color: "#333",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  outline: "none",
                  cursor: "pointer",
                  zIndex: "999",
                }}
              >
                <i className="fas fa-bell"></i>
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "5px",
                    backgroundColor: "#f00",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 5px",
                    fontSize: "12px",
                  }}
                >
                  {notificationRemain}
                </span>
              </button>
            )}
            {showPopup && isOwner && (
              <div className="popup-box">
                <button className="close-button" onClick={togglePopup}>
                  <i className="fas fa-times"></i>
                </button>

                <div className="popup-content">
                  <h4>Notification</h4>
                  <hr />
                  <Notification ID={inputs.ID} maxNotification={maxID} />
                  {/* <button onClick={togglePopup}>Close</button> */}
                </div>
              </div>
            )}
          </div>
          {/* <Navbar/> */} <br />
          <div>
            <div className="row" style={{ height: "700px" }}>
              <div className="col p-5">
                <img
                  src={imageSrc}
                  style={{ width: "330px", height: "400px" }}
                  alt="Profile photo"
                />{" "}
                <br />
                <h3>
                  {" "}
                  <strong>
                    {profileArr.length > 0 && profileArr[0].Name} <hr />
                    <br />
                  </strong>
                </h3>
                {profileArr.length > 0 && profileArr[0].Designation} <br />
                {profileArr.length > 0 && profileArr[0].DepartmentName} <br />
                {/* {isOwner && <a  href="/personalInfo" className="btn btn-outline-info" >Edit profile</a>} */}
                <br />
              </div>
              <div className="col">
                <h3>
                  {" "}
                  <strong>About Me </strong>
                </h3>
                <hr />
                <p>{profileArr.length > 0 && profileArr[0].AboutMe}</p>

                <h3>
                  {" "}
                  <strong>Find me Also </strong>
                </h3>
                <hr />
                <br />

                <a
                  href={profileArr.length > 0 && profileArr[0].ResearchGateLink}
                >
                  <img
                    src={RG}
                    style={{ height: "5%", borderRadius: "50%" }}
                    className="m-1"
                  />
                  ReseachGate
                </a>

                <a
                  href={
                    profileArr.length > 0 && profileArr[0].GoogleScholarlink
                  }
                >
                  <img
                    src={GS}
                    style={{ height: "5%", borderRadius: "50%" }}
                    className="m-1"
                  />
                  Google Scholar
                </a>

                <a href={profileArr.length > 0 && profileArr[0].Orchidlink}>
                  <img
                    src={OC}
                    style={{ height: "5%", borderRadius: "50%" }}
                    className="m-1"
                  />
                  ORCID
                </a>
              </div>
            </div>
            <center>
              <h3>
                {" "}
                <strong>Other Information </strong>
              </h3>
            </center>
            <hr />
            <br />
            <div className="row">
              <div className="row">
                <div className="col">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="m-2 btn btn-outline-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Academic
                    </button>
                    <ul className="dropdown-menu" name="department">
                      <table border="2px">
                        <tr>
                          {educationArr.map((option) => (
                            <option value={option} name="department">
                              <td>{option ? option[0] : ""} ,</td>
                              <td>{option ? option[1] : ""} ,</td>
                              <td>{option ? option[2] : ""} ,</td>
                              <td>{option ? option[3] : ""}</td>
                            </option>
                          ))}
                        </tr>
                      </table>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="dropdown">
                    <button
                      className="m-2 btn btn-outline-light"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Experience
                    </button>
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          set_modal_title("Job Experience");
                          set_modal_body(
                            jobArr[0].length === 0
                              ? "Nothing to Show"
                              : jobArr[0].map((arrel) => <li>{arrel}</li>)
                          );
                        }}
                      >
                        Job Experience
                      </li>
                      <li
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          set_modal_title("Research Experience");
                          set_modal_body(
                            jobArr[0].length === 0
                              ? "Nothing to Show"
                              : jobArr[0].map((arrel) => <li>{arrel}</li>)
                          );
                        }}
                      >
                        Research Experience
                      </li>
                      <li
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          set_modal_title("Thesis Supervision");
                          set_modal_body(
                            jobArr[1].length === 0
                              ? "Nothing to Show"
                              : jobArr[1].map((arrel) => <li>{arrel}</li>)
                          );
                        }}
                      >
                        Thesis Supervisor
                      </li>
                      <li
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          set_modal_title("Affilition");
                          set_modal_body(
                            jobArr[2].length === 0
                              ? "Nothing to Show"
                              : jobArr[2].map((arrel) => <li>{arrel}</li>)
                          );
                        }}
                      >
                        Affiliation
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="dropdown">
                    <button
                      className="m-2 btn btn-outline-light"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Research
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/">
                          Research Interest
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Research Projects
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="dropdown">
                    <button
                      className="m-2 btn btn-outline-light"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Publication
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/">
                          Article
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Conference Proceeding
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Book Chapter
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Book
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Patent
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Technical Note
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Copyright
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="dropdown">
                    <button
                      className="m-2 btn btn-outline-light"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Awards
                    </button>
                    <ul className="dropdown-menu">
                      {/* <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{set_modal_title("Award");set_modal_body(otherArr.length===0? "Nothing to Show" :otherArr.map((arrel)=><li>{ arrel.Type === 'Award'?arrel.Description:arrel}</li>))}}>Award</li> */}
                      <li>
                        <a className="dropdown-item" href="/">
                          Award
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Grant
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // <!-- Button trigger modal --> */}
          {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}
          {/* // <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ color: "black" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {modal_title}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">{modal_body}</div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
