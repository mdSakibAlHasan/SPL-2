import React, { useState } from 'react';

function JoiningInfo() {
  const [joiningInfo, setJoiningInfo] = useState({
    rank: '',
    grade: '',
    post: '',
    batch: '',
    postingPlace: '',
    joiningDate: '',
    officeName: '',
    prlDate: '',
    department: '',
    notificationNo: '',
    notificationDate: '',
    district: '',
    confirmationDate: '',
    upazila: '',
    gazettedDate: '',
    jobNature: '',
    jobCategory: '',
    endorsementDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJoiningInfo({ ...joiningInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Joining Information:', joiningInfo);
  };

  return (
    <div className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
    <center><h4>Joining Information</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Rank/Class</label>
          <div className="col-sm-9">
            <input
              type="text"
              
              name="rank"
              value={joiningInfo.rank}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Grade</label>
          <div className="col-sm-9">
            <input
              type="text"
              
              name="grade"
              value={joiningInfo.grade}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Post/Designation</label>
          <div className="col-sm-9">
            <input
              type="text"
              
              name="post"
              value={joiningInfo.post}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Batch</label>
          <div className="col-sm-9">
            <input
              type="text"
              
              name="batch"
              value={joiningInfo.batch}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Posting Place</label>
          <div className="col-sm-9">
            <input
              type="text"
              
              name="postingPlace"
              value={joiningInfo.postingPlace}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Joining Date</label>
          <div className="col-sm-9">
            <input
              type="date"
              
              name="joiningDate"
              value={joiningInfo.joiningDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Office Name</label>
          <div className="col-sm-9">
            <input type="text"

name="officeName"
value={joiningInfo.officeName}
onChange={handleChange}
/>
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">PRL Date</label>
<div className="col-sm-9">
<input
           type="date"
           
           name="prlDate"
           value={joiningInfo.prlDate}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Department</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="department"
           value={joiningInfo.department}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Notification/Order No.</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="notificationNo"
           value={joiningInfo.notificationNo}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Notification/Order Date</label>
<div className="col-sm-9">
<input
           type="date"
           
           name="notificationDate"
           value={joiningInfo.notificationDate}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">District</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="district"
           value={joiningInfo.district}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Confirmation Date</label>
<div className="col-sm-9">
<input
           type="date"
           
           name="confirmationDate"
           value={joiningInfo.confirmationDate}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Upazila</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="upazila"
           value={joiningInfo.upazila}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Gazetted Date</label>
<div className="col-sm-9">
<input
           type="date"
           
           name="gazettedDate"
           value={joiningInfo.gazettedDate}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Job Nature</label>
<div className="col-sm-9">
<select

name="jobNature"
value={joiningInfo.jobNature}
onChange={handleChange}>
<option style={{color:"black"}} value="">Select Job Nature</option>
<option style={{color:"black"}} value="Permanent">Permanent</option>
<option style={{color:"black"}} value="Temporary">Temporary</option>
<option style={{color:"black"}} value="Contractual">Contractual</option>
</select>
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Posting District</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="postingDistrict"
           value={joiningInfo.postingDistrict}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Posting Upazila</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="postingUpazila"
           value={joiningInfo.postingUpazila}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Present Pay Scale</label>
<div className="col-sm-9">
<input
           type="text"
           
           name="presentPayScale"
           value={joiningInfo.presentPayScale}
           onChange={handleChange}
         />
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Remarks</label>
<div className="col-sm-9">
<textarea
           
           name="remarks"
           value={joiningInfo.remarks}
           onChange={handleChange}
         />
</div>
</div>
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
export default JoiningInfo;
