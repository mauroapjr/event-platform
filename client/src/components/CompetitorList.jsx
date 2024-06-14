import React from "react";
import CompetitorItem from "./CompetitorItem";

const CompetitorsList = ({
  competitors,
  selectedEventName,
  handleDeleteCompetitor,
}) => {
  return (
    <>
      <h3>Existing Competitors</h3>
      <ul className="list-group">
        {competitors.map((competitor) => (
          <CompetitorItem
            key={competitor.id}
            competitor={competitor}
            selectedEventName={selectedEventName}
            handleDeleteCompetitor={handleDeleteCompetitor}
          />
        ))}
      </ul>
    </>
  );
};

export default CompetitorsList;
