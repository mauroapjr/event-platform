import React, { useState, useEffect } from "react";
import axios from "axios";

const RoundsDisplay = ({ eventId }) => {
  const [rounds, setRounds] = useState([]);

  const fetchRounds = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-specific-rounds/${eventId}`
      );
      const roundsData = response.data;
      console.log("Fetched rounds data:", roundsData);

      const processedRounds = [];

      roundsData.forEach((row) => {
        let round = processedRounds.find((r) => r.id === row.round_id);
        if (!round) {
          round = {
            id: row.round_id,
            name: row.round_name,
            heats: [],
          };
          processedRounds.push(round);
        }

        let heat = round.heats.find((h) => h.id === row.heat_id);
        if (!heat) {
          heat = {
            id: row.heat_id,
            name: row.heat_name,
            competitors: [],
          };
          round.heats.push(heat);
        }

        heat.competitors.push({
          id: row.competitor_id,
          name: row.competitor_name,
        });
      });

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





