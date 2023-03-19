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
    <div className="container mt-4">
      <h2>Joining Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Rank/Class</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
              name="batch"
              value={joiningInfo.batch}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Posting Place/Workstation</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
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
              className="form-control"
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
className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
className="form-control"
name="jobNature"
value={joiningInfo.jobNature}
onChange={handleChange}>
<option value="">Select Job Nature</option>
<option value="Permanent">Permanent</option>
<option value="Temporary">Temporary</option>
<option value="Contractual">Contractual</option>
</select>
</div>
</div>
<div className="form-group row">
<label className="col-sm-3 col-form-label">Posting District</label>
<div className="col-sm-9">
<input
           type="text"
           className="form-control"
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
           className="form-control"
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
           className="form-control"
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
           className="form-control"
           name="remarks"
           value={joiningInfo.remarks}
           onChange={handleChange}
         />
</div>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>

);
}
export default JoiningInfo;
