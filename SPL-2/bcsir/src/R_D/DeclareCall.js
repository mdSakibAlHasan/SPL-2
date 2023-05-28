import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";

function DeclareCall() {
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState([]);
  const [input, setinput] = useState({
    dateline: "",
    description: "",
    ID: "",
  });

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
        if (ID.data[0].type !== "PI") {
          navigate("/login");
        } else {
          setInfo(ID.data);
          input.ID = ID.data[0].ID;
        }
        console.log("Here is info:", ID.data);
      }
    };
    handleProfileClick();
  }, [result]);

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("submit clicked");
    input.dateline = deadline;
    input.description = description;

    // const result = await axios.post(
    //   "http://localhost:3001/app/sendNotification",
    //   {
    //     ID: info[0].ID,
    //     dept: "",
    //     DepartmentID: info[0].DepartmentID,
    //     Email: true,
    //     Profile: true,
    //     Tittle: "PI declare a call for proposal submit",
    //     Body: description,
    //   }
    // );

    e.preventDefault();
    console.log(
      `Deadline: ${input.dateline}\nDescription: ${input.description}, input ${input}`
    );
    await axios.post("http://localhost:3001/RD/declareCall", input);
    navigate("/home");
    // Add code here to submit the deadline and description to the server
  };

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        <center>
          <h4>Declare Project Call</h4>
        </center>{" "}
        <hr /> <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group p-2">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>{" "}
          <hr />
          <div className="form-group p-2">
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder="Write description here"
              id="description"
              rows="3"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>{" "}
          <hr />
          {/* <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
          <input
            className=" m-2 btn btn-outline-light"
            type="button"
            value="Declare Call"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default DeclareCall;
