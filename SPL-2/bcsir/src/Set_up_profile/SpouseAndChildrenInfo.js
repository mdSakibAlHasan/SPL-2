import React, { useState } from "react";

export default function SpouseAndChildrenInfo() {
    const [spouseInfo, setSpouseInfo] = useState({
        name: "",
        district: "",
        occupation: "",
        designation: "",
        orgName: "",
        orgAddress: "",
        cellNo: ""
      });
    
      const [children, setChildren] = useState([]);
    
      const handleSpouseInfoChange = (e) => {
        const { name, value } = e.target;
        setSpouseInfo((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleChildInfoChange = (e, index) => {
        const { name, value } = e.target;
        setChildren((prev) =>
          prev.map((child, i) =>
            i === index ? { ...child, [name]: value } : child
          )
        );
      };
    
      const addChild = () => {
        setChildren((prev) => [
          ...prev,
          { name: "", gender: "", birthDate: "", birthPlace: "", remarks: "" }
        ]);
      };
    
      const removeChild = (index) => {
        setChildren((prevChildren) => prevChildren.filter((child, i) => i !== index));
      };
      
      
      const handleChildChange = (event, index) => {
        const { name, value } = event.target;
        setChildren((prevChildren) =>
          prevChildren.map((child, i) => (i === index ? { ...child, [name]: value } : child))
        );
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        // databese connection korte hobe
      }
      return (
        <div className="container">
          <h1>Spouse and Children Information</h1>
          <h2>Spouse Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="spouseName">Spouse Name</label>
              <input
                type="text"
                className="form-control"
                id="spouseName"
                name="name"
                value={spouseInfo.name}
                onChange={handleSpouseInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="spouseDistrict">Home District</label>
              <input
                type="text"
                className="form-control"
                id="spouseDistrict"
                name="district"
                value={spouseInfo.district}
                onChange={handleSpouseInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                name="occupation"
                value={spouseInfo.occupation}
                onChange={handleSpouseInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                className="form-control"
                id="designation"
                name="designation"
                value={spouseInfo.designation}
                onChange={handleSpouseInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="spouseOrgName">Organization Name</label>
              <input
                type="text"
                className="form-control"
                id="spouseOrgName"
                name="orgName"
                value={spouseInfo.orgName}
                onChange={handleSpouseInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="orgAddress">Organization Address</label>
              <input
                type="text"
                className="form-control"
                id="orgAddress"
                name="orgAddress"
                value={spouseInfo.orgAddress}
                onChange={handleSpouseInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cellNo">Cell No
              </label>
          <input
            type="text"
            className="form-control"
            id="cellNo"
            name="cellNo"
            value={spouseInfo.cellNo}
            onChange={handleSpouseInfoChange}
          />
        </div>

        <h4>Children Information</h4>
        {children.map((child, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-header">
              <h5>Child {index + 1}</h5>
              <button className="btn btn-danger" onClick={() => removeChild(index)}>
                Remove
              </button>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="childName">Child Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="childName"
                  name="childName"
                  value={child.childName}
                  onChange={(event) => handleChildChange(event, index)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={child.gender}
                  onChange={(event) => handleChildChange(event, index)}
                >
                  <option value="">--Select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Birth Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthDate"
                  name="birthDate"
                  value={child.birthDate}
                  onChange={(event) => handleChildChange(event, index)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthPlace">Birth Place</label>
                <input
                  type="text"
                  className="form-control"
                  id="birthPlace"
                  name="birthPlace"
                  value={child.birthPlace}
                  onChange={(event) => handleChildChange(event, index)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  id="remarks"
                  name="remarks"
                  value={child.remarks}
                  onChange={(event) => handleChildChange(event, index)}
                />
              </div>
            </div>
          </div>
        ))}

        <button className="btn btn-primary" onClick={addChild}>
          Add Child
        </button>

        <button className="btn btn-success mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
      );

}
