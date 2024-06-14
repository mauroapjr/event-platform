import React, { useState } from 'react';
import axios from 'axios';

const AddJudgeForm = ({ eventId, fetchJudges }) => {
  const [judgeName, setJudgeName] = useState("");

  const handleAddJudge = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/event-admin/add-judge", {
        name: judgeName,
        event_id: eventId,
      });
      alert("Judge added successfully");
      setJudgeName("");
      fetchJudges(eventId);
    } catch (error) {
      console.error("Error adding judge:", error);
      alert("Error adding judge");
    }
  };

  return (
    <div>
      <h3>Add Judge</h3>
      <form onSubmit={handleAddJudge} className="mb-4">
        <div className="form-group">
          <label>Judge Name:</label>
          <input
            type="text"
            className="form-control"
            value={judgeName}
            onChange={(e) => setJudgeName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Judge
        </button>
      </form>
    </div>
  );
};

export default AddJudgeForm;
