// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ScoreManagement = () => {
//   const [competitors, setCompetitors] = useState([]);
//   const [scores, setScores] = useState([]);
//   const [score, setScore] = useState('');
//   const [judgeId, setJudgeId] = useState(1);  

//   useEffect(() => {
//     fetchCompetitors();
//   }, []);

//   const fetchCompetitors = async () => {
//     const response = await axios.get('http://localhost:3000/judge/get-competitors');
//     setCompetitors(response.data);
//   };

//   const fetchScores = async () => {
//     const response = await axios.get('http://localhost:3000/judge/get-scores');
//     setScores(response.data);
//   };

//   const handleAddScore = async (e, competitorId) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/judge/add-score', { judge_id: judgeId, competitor_id: competitorId, score });
//       alert('Score added successfully');
//       setScore('');
//       fetchScores();
//     } catch (error) {
//       console.error('Error adding score:', error);
//       alert('Error adding score');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Manage Scores</h2>
//       <h3>Competitors</h3>
//       <ul className="list-group mb-4">
//         {competitors.map((competitor) => (
//           <li key={competitor.id} className="list-group-item">
//             {competitor.name}
//             <form onSubmit={(e) => handleAddScore(e, competitor.id)} className="mt-2">
//               <div className="form-group">
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={score}
//                   onChange={(e) => setScore(e.target.value)}
//                   placeholder="Score"
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary mt-2">Add Score</button>
//             </form>
//           </li>
//         ))}
//       </ul>

//       <h3>Scores</h3>
//       <ul className="list-group">
//         {scores.map((score) => (
//           <li key={score.id} className="list-group-item">
//             Judge {score.judge_id} scored {score.competitor_id}: {score.score}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScoreManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ScoreManagement = () => {
  const [events, setEvents] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [scores, setScores] = useState([]);
  const [score, setScore] = useState('');
  const [judgeId, setJudgeId] = useState(1);  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [heats, setHeats] = useState([]);
  const [selectedHeat, setSelectedHeat] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/judge/get-events/${judgeId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchRounds = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:3000/event-admin/get-rounds/${eventId}`);
      setRounds(response.data);
    } catch (error) {
      console.error('Error fetching rounds:', error);
    }
  };

  const fetchHeats = async (roundId) => {
    try {
      const response = await axios.get(`http://localhost:3000/event-admin/get-heats/${roundId}`);
      setHeats(response.data);
    } catch (error) {
      console.error('Error fetching heats:', error);
    }
  };

  const fetchCompetitors = async (heatId) => {
    try {
      const response = await axios.get(`http://localhost:3000/event-admin/get-heat-competitors/${heatId}`);
      setCompetitors(response.data);
    } catch (error) {
      console.error('Error fetching competitors:', error);
    }
  };

  const fetchScores = async (heatId) => {
    try {
      const response = await axios.get(`http://localhost:3000/event-admin/get-scores/${heatId}`);
      setScores(response.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const handleAddScore = async (e, competitorId) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/judge/add-score', { judge_id: judgeId, competitor_id: competitorId, score });
      alert('Score added successfully');
      setScore('');
      fetchScores(selectedHeat);
    } catch (error) {
      console.error('Error adding score:', error);
      alert('Error adding score');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Scores</h2>

      <h3>Events</h3>
      <ul className="list-group mb-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item"
            onClick={() => {
              setSelectedEvent(event.id);
              fetchRounds(event.id);
            }}
          >
            {event.name}
          </li>
        ))}
      </ul>

      <h3>Rounds</h3>
      {selectedEvent && (
        <ul className="list-group mb-4">
          {rounds.map((round) => (
            <li
              key={round.id}
              className="list-group-item"
              onClick={() => {
                setSelectedRound(round.id);
                fetchHeats(round.id);
              }}
            >
              {round.round_name}
            </li>
          ))}
        </ul>
      )}

      <h3>Heats</h3>
      {selectedRound && (
        <ul className="list-group mb-4">
          {heats.map((heat) => (
            <li
              key={heat.id}
              className="list-group-item"
              onClick={() => {
                setSelectedHeat(heat.id);
                fetchCompetitors(heat.id);
                fetchScores(heat.id);
              }}
            >
              {heat.heat_name}
            </li>
          ))}
        </ul>
      )}

      <h3>Competitors</h3>
      <ul className="list-group mb-4">
        {competitors.map((competitor) => (
          <li key={competitor.id} className="list-group-item">
            {competitor.name}
            <form onSubmit={(e) => handleAddScore(e, competitor.id)} className="mt-2">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Score"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Add Score</button>
            </form>
          </li>
        ))}
      </ul>

      <h3>Scores</h3>
      <ul className="list-group">
        {scores.map((score) => (
          <li key={score.id} className="list-group-item">
            Judge {score.judge_id} scored {score.competitor_id}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreManagement;


