import React, { useState } from 'react';

function PS_AddressForm() {
  const [presentAddress, setPresentAddress] = useState({
    homeAddress: '',
    postOffice: '',
    policeStation: '',
    district: '',
    upazila: ''
  });
  const [permanentAddress, setPermanentAddress] = useState({
    homeAddress: '',
    postOffice: '',
    policeStation: '',
    district: '',
    upazila: ''
  });

  const handlePresentAddressChange = (event) => {
    const { name, value } = event.target;
    setPresentAddress((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePermanentAddressChange = (event) => {
    const { name, value } = event.target;
    setPermanentAddress((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSameAsPresentChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setPermanentAddress(presentAddress);
    } else {
      setPermanentAddress({
        homeAddress: '',
        postOffice: '',
        policeStation: '',
        district: '',
        upazila: ''
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Present Address:', presentAddress);
    console.log('Permanent Address:', permanentAddress);
  };

  const updateData =()=>{
        
  }

  return (
    <div className="container mt-5">
      <h1>Address Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <h2>Present Address</h2>
            <div className="form-group">
              <label htmlFor="presentHomeAddress">Home Address</label>
              <input
                type="text"
                className="form-control"
                id="presentHomeAddress"
                name="homeAddress"
                value={presentAddress.homeAddress}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="presentPostOffice">Post Office</label>
              <input
                type="text"
                className="form-control"
                id="presentPostOffice"
                name="postOffice"
                value={presentAddress.postOffice}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="presentPoliceStation">Police Station</label>
              <input
                type="text"
                className="form-control"
                id="presentPoliceStation"
                name="policeStation"
                value={presentAddress.policeStation}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="presentDistrict">District</label>
              <input
                type="text"
                className="form-control"
                id="presentDistrict"
                name="district"
                value={presentAddress.district}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="presentUpazila">Upazila</label>
              <input
                type="text"
                className="form-control"
                id="presentUpazila"
                name="upazila"
                value={presentAddress.upazila}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="sameAsPresent"
                onChange={handleSameAsPresentChange}
              />
              <label className="form-check-label" htmlFor="sameAsPresent">
                Same as Present Address
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Permanent Address</h2>
            <div className="form-group">
              <label htmlFor="permanentHomeAddress">Home Address</label>
              <input
                type="text"
                className="form-control"
                id="permanentHomeAddress"
                name="homeAddress"
                value={permanentAddress.homeAddress}
                onChange={handlePermanentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="permanentPostOffice">Post Office</label>
              <input
                type="text"
                className="form-control"
                id="permanentPostOffice"
                name="postOffice"
                value={permanentAddress.postOffice}
                onChange={handlePermanentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="permanentPoliceStation">Police Station</label>
              <input
                type="text"
                className="form-control"
                id="permanentPoliceStation"
                name="policeStation"
                value={permanentAddress.policeStation}
                onChange={handlePermanentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="permanentDistrict">District</label>
              <input
                type="text"
                className="form-control"
                id="permanentDistrict"
                name="district"
                value={permanentAddress.district}
                onChange={handlePermanentAddressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="permanentUpazila">Upazila</label>
              <input
                type="text"
                className="form-control"
                id="permanentUpazila"
                name="upazila"
                value={permanentAddress.upazila}
                onChange={handlePermanentAddressChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
        <button  className="btn btn-success mx-1" onClick={updateData}>Proceed to Next</button>

        </div>
      </form>
    </div>
  );
}

export default PS_AddressForm;

               
