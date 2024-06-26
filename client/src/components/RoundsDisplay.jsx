import React, { useState, useEffect } from "react";
import axios from "axios";

const RoundsDisplay = ({ eventId }) => {
  const [rounds, setRounds] = useState([]);

  const fetchRounds = async () => {
    const testEventId = 5;
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-rounds/${eventId}`
      );
      const roundsData = response.data;
      console.log("Fetched rounds data:", roundsData);

      const processedRounds = roundsData.map((round) => ({
        id: round.id,
        name: round.round_name,
        category: round.category,
        sub_category: round.sub_category,
        board_type: round.board_type,
        gender: round.gender,
        age_category: round.age_category,
        heats: (round.heats || []).map((heat) => ({
          id: heat.id,
          name: heat.heat_name,
          competitors: (heat.competitors || []).map((competitor) => ({
            id: competitor.id,
            name: competitor.name,
          })),
        })),
      }));

      console.log("Processed rounds:", processedRounds);
      setRounds(processedRounds);
    } catch (error) {
      console.error("Error fetching rounds:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchRounds();
    }
  }, [eventId]);

  useEffect(() => {
    console.log("Updated rounds state:", rounds);
  }, [rounds]);

  return (
    <div>
      <h3>Rounds</h3>
      {rounds.length === 0 ? (
        <p>No rounds with heats available.</p>
      ) : (
        rounds.map((round) => (
          <div key={round.id}>
            <h4>{round.name}</h4>
            {round.heats.length === 0 ? (
              <p>No heats available.</p>
            ) : (
              round.heats.map((heat) => (
                <div key={heat.id}>
                  <h5>{heat.name}</h5>
                  <ul>
                    {heat.competitors.length === 0 ? (
                      <li>No competitors available.</li>
                    ) : (
                      heat.competitors.map((competitor) => (
                        <li key={competitor.id}>{competitor.name}</li>
                      ))
                    )}
                  </ul>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RoundsDisplay;





