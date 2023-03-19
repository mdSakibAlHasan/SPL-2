import React, { useState } from 'react';

const achievementTypes = [
  'Journal Article',
  'Conference Proceeding',
  'Developed Process',
  'Patent',
  'Book',
  'Award',
];

function AchievementPublication() {
  const [achievements, setAchievements] = useState([
    {
      type: '',
      year: '',
      description: '',
    },
  ]);

  const handleAchievementChange = (index, event) => {
    const values = [...achievements];
    values[index][event.target.name] = event.target.value;
    setAchievements(values);
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        type: '',
        year: '',
        description: '',
      },
    ]);
  };

  const removeAchievement = (index) => {
    const values = [...achievements];
    values.splice(index, 1);
    setAchievements(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Achievements:', achievements);
  };

  return (
    <div className="container mt-4">
      <h2>Achievement and Publication</h2>
      <form onSubmit={handleSubmit}>
        {achievements.map((achievement, index) => (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <h4 className="card-title">Achievement/Publication {index + 1}</h4>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Type</label>
                <div className="col-sm-9">
                  <select
                    className="form-control"
                    name="type"
                    value={achievement.type}
                    onChange={(event) => handleAchievementChange(index, event)}
                  >
                    <option value="">Select Type</option>
                    {achievementTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Year</label>
                <div className="col-sm-9">
                  <input
                    type="number" placeholder="YYYY" min="1959" max="2030"
                    className="form-control"
                    name="year"
                    value={achievement.year}
                    onChange={(event) => handleAchievementChange(index, event)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Description</label>
                <div className="col-sm-9">
                  <textarea
                    className="form-control"
                    name="description"
                    value={achievement.description}
                    onChange={(event) => handleAchievementChange(index, event)}
                  />
                </div>
              </div>
              {index !== 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeAchievement(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addAchievement}>
          Add Achievement/Publication
        </button>
        <button type="submit" className="btn btn-success ml-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AchievementPublication;
