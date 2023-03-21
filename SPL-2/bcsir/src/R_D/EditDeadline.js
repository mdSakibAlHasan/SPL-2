import React, { useState } from 'react';

export default function EditDeadline() {
  const [showPopup, setShowPopup] = useState(false);
  const [deadline, setDeadline] = useState('2023-03-31');

  const handleSaveDeadline = () => {
    // save the new deadline to the database
    setShowPopup(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
        Edit Deadline
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Previous Deadline: {deadline}</h3>
            <label htmlFor="new-deadline">New Deadline:</label>
            <input
              id="new-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSaveDeadline}>
              Save Deadline
            </button>
            <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
