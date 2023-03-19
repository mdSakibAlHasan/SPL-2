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
    <div className="container mt-4">
      <h2>Promotion Information</h2>
      <form onSubmit={handleSubmit}>
        {promotions.map((promotion, index) => (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Promotion {index + 1}</h4>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Designation</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
          <button
            type="button"
            className="btn btn-success mb-2"
            onClick={addPromotion}
          >
            Add Promotion
          </button>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromotionInfo;
