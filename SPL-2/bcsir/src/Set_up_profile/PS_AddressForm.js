import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PS_AddressForm() {
  const [presentAddress, setPresentAddress] = useState({
    homeAddress: "",
    postOffice: "",
    policeStation: "",
    district: "",
    upazila: "",
  });
  const [permanentAddress, setPermanentAddress] = useState({
    homeAddress: "",
    postOffice: "",
    policeStation: "",
    district: "",
    upazila: "",
  });
  const navigate = useNavigate();
  const handlePresentAddressChange = (event) => {
    const { name, value } = event.target;
    setPresentAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePermanentAddressChange = (event) => {
    const { name, value } = event.target;
    setPermanentAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSameAsPresentChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setPermanentAddress(presentAddress);
    } else {
      setPermanentAddress({
        homeAddress: "",
        postOffice: "",
        policeStation: "",
        district: "",
        upazila: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Present Address:", presentAddress);
    console.log("Permanent Address:", permanentAddress);
  };

  const updateData = () => {};

  const nextPage = () => {
    navigate("/postingInfo");
  };

  return (
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
        <center>
          <h4>Address Information</h4>
        </center>{" "}
        <hr /> <br />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h4>Present Address</h4> <hr />
              <div className="form-group">
                <label htmlFor="presentHomeAddress">Home Address</label>
                <input
                  type="text"
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
              <h4>Permanent Address</h4> <hr />
              <div className="form-group">
                <label htmlFor="permanentHomeAddress">Home Address</label>
                <input
                  type="text"
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
                  id="permanentUpazila"
                  name="upazila"
                  value={permanentAddress.upazila}
                  onChange={handlePermanentAddressChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <br />
            <center>
              {/* @sakib  onlcick add kore action/navigate korte hobe*/}
              <button type="button" className="m-2 btn btn-outline-light">
                Save Data
              </button>
              <button
                type="submit"
                className="m-2 btn btn-outline-light"
                onClick={nextPage}
              >
                Go to Next Page
              </button>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PS_AddressForm;
