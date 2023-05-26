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
        <div  className='full_page_normal p-5 shade1'>
        <div className="shade2 p-5 rounded">
          <center><h4>Spouse and Children Information</h4></center> <hr /> <br/>
          <h4>Spouse Information</h4> <hr/>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="spouseName">Spouse Name</label>
              <input
                type="text"
                
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
            
            id="cellNo"
            name="cellNo"
            value={spouseInfo.cellNo}
            onChange={handleSpouseInfoChange}
          />
        </div>
        <br/><br/>
        <h4>Children Information</h4><hr/>
        {children.map((child, index) => (
          <div className="mb-3" key={index}>
            <div className="card-header">
              <h4>Child {index + 1}</h4> <hr/>
              
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="childName">Child Name</label>
                <input
                  type="text"
                  
                  id="childName"
                  name="childName"
                  value={child.childName}
                  onChange={(event) => handleChildChange(event, index)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  
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
                  
                  id="remarks"
                  name="remarks"
                  value={child.remarks}
                  onChange={(event) => handleChildChange(event, index)}
                />
              </div>
              <br />
              <button className="btn btn-danger" onClick={() => removeChild(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <button className="m-2 btn btn-outline-light" onClick={addChild}>
          Add Child
        </button>

        <br/><center>
          {/* @sakib  onlcick add kore action/navigate korte hobe*/}
          <button type="button" className="m-2 btn btn-outline-light">
            Save Data
          </button>
          <button type="submit" className="m-2 btn btn-outline-light">
            Go to Next Page
          </button>
        </center>
      </form>
    </div>
    </div>
      );

}
