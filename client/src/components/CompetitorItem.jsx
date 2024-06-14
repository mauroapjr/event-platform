import React from "react";

const CompetitorItem = ({
  competitor,
  selectedEventName,
  handleDeleteCompetitor,
}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {competitor.name} (Event: {selectedEventName}, Category:{" "}
      {competitor.category}, Sub Category: {competitor.sub_category}, Board
      Type: {competitor.board_type}, Gender: {competitor.gender}, Age Category:{" "}
      {competitor.age_category})
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteCompetitor(competitor.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default CompetitorItem;
