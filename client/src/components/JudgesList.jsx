import React from 'react';

const JudgesList = ({ judges, selectedEventName, handleDeleteJudge }) => {
  return (
    <div>
      <h3>Manage Judges for {selectedEventName}</h3>
      <ul className="list-group">
        {judges.map((judge) => (
          <li
            key={judge.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {judge.name} (Event: {selectedEventName})
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteJudge(judge.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JudgesList;
