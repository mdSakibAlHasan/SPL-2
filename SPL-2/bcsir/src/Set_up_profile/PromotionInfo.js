import React, { useState } from "react";

const promotionOptions = ["Regular", "Selection Grade", "Sr. Grade", "Natural"];

function PromotionInfo() {
  const [promotions, setPromotions] = useState([
    {
      designation: "",
      nature: "",
      promotionDate: "",
      orderNo: "",
      orderDate: "",
      remarks: "",
    },
  ]);

  const handlePromotionChange = (index, event) => {
    const values = [...promotions];
    values[index][event.target.name] = event.target.value;
    setPromotions(values);
  };

  const addPromotion = () => {
    setPromotions([
      ...promotions,
      {
        designation: "",
        nature: "",
        promotionDate: "",
        orderNo: "",
        orderDate: "",
        remarks: "",
      },
    ]);
  };

  const removePromotion = (index) => {
    const values = [...promotions];
    values.splice(index, 1);
    setPromotions(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Promotion Info:", promotions);
  };

  return (
    <div  className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      {/* <h2>Promotion Information</h2> */}
      <center><h4>Promotion Information</h4></center> <hr /> <br/>
      <form onSubmit={handleSubmit}>
        {promotions.map((promotion, index) => (
          <div className="mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Promotion {index + 1}</h4><hr/>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Designation</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    
                    name="designation"
                    value={promotion.designation}
                    onChange={(event) => handlePromotionChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Nature</label>
                <div className="col-sm-9">
                  <select
                    
                    name="nature"
                    value={promotion.nature}
                    onChange={(event) => handlePromotionChange(index, event)}
                  >
                    <option value="">Select Nature</option>
                    {promotionOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Promotion Date
                </label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    
                    name="promotionDate"
                    value={promotion.promotionDate}
                    onChange={(event) => handlePromotionChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Order No.</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    
                    name="orderNo"
                    value={promotion.orderNo}
                    onChange={(event) => handlePromotionChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Order Date</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    
                    name="orderDate"
                    value={promotion.orderDate}
                    onChange={(event) => handlePromotionChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Remarks</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    
                    name="remarks"
                    value={promotion.remarks}
                    onChange={(event) => handlePromotionChange(index, event)}
                  />
                </div>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => removePromotion(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="text-center">
         
        </div>
        <br/><center> 
          <button
            type="button"
            className="m-2 btn btn-outline-light"
            onClick={addPromotion}
          >
            Add Promotion
          </button>
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

export default PromotionInfo;
