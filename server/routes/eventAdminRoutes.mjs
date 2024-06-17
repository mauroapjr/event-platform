import express from "express";
import pool from "../db.mjs";
import Pool from "pg";

import PDFDocument from "pdfkit";

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3",
      [username, password, "event_admin"]
    );
    const user = result.rows[0];
    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Events
router.get("/get-events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create Event
router.post("/create-event", async (req, res) => {
  const { name, date, location, created_by } = req.body;
  try {
    const newEvent = await pool.query(
      "INSERT INTO events (name, date, location, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, date, location, created_by]
    );
    res.status(201).json(newEvent.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Edit Event
router.put("/edit-event/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, location } = req.body;
  try {
    const updatedEvent = await pool.query(
      "UPDATE events SET name = $1, date = $2, location = $3 WHERE id = $4 RETURNING *",
      [name, date, location, id]
    );
    res.status(200).json(updatedEvent.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete Event
router.delete("/delete-event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Competitors for a Specific Event
router.get("/get-competitors/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM competitors WHERE event_id = $1",
      [eventId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching competitors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add Competitor
router.post("/add-competitor", async (req, res) => {
  const {
    name,
    event_id,
    category,
    sub_category,
    board_type,
    gender,
    age_category,
  } = req.body;

  try {
    const newCompetitor = await pool.query(
      "INSERT INTO competitors (name, event_id, category, sub_category, board_type, gender, age_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, event_id, category, sub_category, board_type, gender, age_category]
    );
    res.status(201).json(newCompetitor.rows[0]);
  } catch (err) {
    console.error("Error adding competitor:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Edit Competitor
router.put("/edit-competitor/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCompetitor = await pool.query(
      "UPDATE competitors SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    res.status(200).json(updatedCompetitor.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete Competitor
router.delete("/delete-competitor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM competitors WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch Judges for an Event
router.get("/get-judges/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM judges WHERE event_id = $1",
      [eventId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching judges:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add Judge to an Event
router.post("/add-judge", async (req, res) => {
  const { name, event_id } = req.body;

  try {
    const newJudge = await pool.query(
      "INSERT INTO judges (name, event_id) VALUES ($1, $2) RETURNING *",
      [name, event_id]
    );
    res.status(201).json(newJudge.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete Judge
router.delete("/delete-judge/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM judges WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add Round
router.post("/add-round", async (req, res) => {
  const { event_id, round_name } = req.body;
  try {
    const newRound = await pool.query(
      "INSERT INTO rounds (event_id, round_name) VALUES ($1, $2) RETURNING *",
      [event_id, round_name]
    );
    res.status(201).json(newRound.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Rounds by Event ID
router.get("/get-rounds/:event_id", async (req, res) => {
  const { event_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM rounds WHERE event_id = $1",
      [event_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add Heat
router.post("/add-heat", async (req, res) => {
  const { round_id, heat_name } = req.body;
  try {
    const newHeat = await pool.query(
      "INSERT INTO heats (round_id, heat_name) VALUES ($1, $2) RETURNING *",
      [round_id, heat_name]
    );
    res.status(201).json(newHeat.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Heats by Round ID
router.get("/get-heats/:round_id", async (req, res) => {
  const { round_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM heats WHERE round_id = $1", [
      round_id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add Competitor to Heat
router.post("/add-heat-competitor", async (req, res) => {
  const { heat_id, competitor_id } = req.body;
  try {
    const newHeatCompetitor = await pool.query(
      "INSERT INTO heat_competitors (heat_id, competitor_id) VALUES ($1, $2) RETURNING *",
      [heat_id, competitor_id]
    );
    res.status(201).json(newHeatCompetitor.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Competitors by Heat ID
router.get("/get-heat-competitors/:heat_id", async (req, res) => {
  const { heat_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.category, c.sub_category, c.board_type, c.gender, c.age_category 
           FROM competitors c 
           JOIN heat_competitors hc ON c.id = hc.competitor_id 
           WHERE hc.heat_id = $1`,
      [heat_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Move Competitor to Another Heat
router.post("/move-competitor", async (req, res) => {
  const { fromHeatId, toHeatId, competitorId } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Remove competitor from the old heat
    await client.query(
      "DELETE FROM heat_competitors WHERE heat_id = $1 AND competitor_id = $2",
      [fromHeatId, competitorId]
    );

    // Add competitor to the new heat
    await client.query(
      "INSERT INTO heat_competitors (heat_id, competitor_id) VALUES ($1, $2)",
      [toHeatId, competitorId]
    );

    await client.query("COMMIT");
    res.status(200).json({ message: "Competitor moved successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error moving competitor:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

// Save rounds and heats to the database
router.post("/save-rounds", async (req, res) => {
  const { eventId, rounds } = req.body;

  console.log("Saving rounds for event:", eventId);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const round of rounds) {
      const {
        name,
        category,
        sub_category,
        board_type,
        gender,
        age_category,
        heats,
      } = round;
      console.log("Saving round:", name);
      const roundResult = await client.query(
        "INSERT INTO rounds (event_id, round_name, category, sub_category, board_type, gender, age_category, round_date) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING id",
        [
          eventId,
          name,
          category,
          sub_category,
          board_type,
          gender,
          age_category,
        ]
      );

      const roundId = roundResult.rows[0].id;
      console.log("Round saved with ID:", roundId);

      for (const heat of heats) {
        console.log("Saving heat:", heat.heat_name);
        const heatResult = await client.query(
          "INSERT INTO heats (round_id, heat_name) VALUES ($1, $2) RETURNING id",
          [roundId, heat.heat_name]
        );

        const heatId = heatResult.rows[0].id;
        console.log("Heat saved with ID:", heatId);

        for (const competitor of heat.competitors) {
          console.log("Saving competitor:", competitor.id);
          await client.query(
            "INSERT INTO heat_competitors (heat_id, competitor_id) VALUES ($1, $2)",
            [heatId, competitor.id]
          );
        }
      }
    }

    await client.query("COMMIT");
    console.log("All rounds and heats saved successfully");
    res.status(200).json({ message: "Rounds saved successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error saving rounds:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});


router.get("/get-rounds/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    // Fetch rounds
    const roundsResult = await pool.query(
      "SELECT * FROM rounds WHERE event_id = $1",
      [eventId]
    );
    const rounds = roundsResult.rows;
    console.log("Fetched rounds:", rounds);

    for (const round of rounds) {
      // Fetch heats for each round
      const heatsResult = await pool.query(
        "SELECT * FROM heats WHERE round_id = $1",
        [round.id]
      );
      const heats = heatsResult.rows;
      console.log("Fetched heats for round", round.id, ":", heats);

      for (const heat of heats) {
        // Fetch competitors for each heat
        const competitorsResult = await pool.query(
          `SELECT c.id, c.name 
           FROM competitors c
           JOIN heat_competitors hc ON hc.competitor_id = c.id
           WHERE hc.heat_id = $1`,
          [heat.id]
        );
        heat.competitors = competitorsResult.rows;
        console.log(
          "Fetched competitors for heat",
          heat.id,
          ":",
          heat.competitors
        );
      }
      round.heats = heats;
    }

    console.log(
      "Fetched rounds with details:",
      JSON.stringify(rounds, null, 2)
    );
    res.status(200).json(rounds);
  } catch (error) {
    console.error("Error fetching rounds:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// // Get all rounds for an event
// router.get("/get-rounds/:eventId", async (req, res) => {
//   const { eventId } = req.params;

//   try {
//     // Fetch rounds
//     const roundsResult = await pool.query(
//       "SELECT * FROM rounds WHERE event_id = $1",
//       [eventId]
//     );
//     const rounds = roundsResult.rows;
//     console.log("Fetched rounds:", rounds);

//     for (const round of rounds) {
//       // Fetch heats for each round
//       const heatsResult = await pool.query(
//         "SELECT * FROM heats WHERE round_id = $1",
//         [round.id]
//       );
//       const heats = heatsResult.rows;
//       console.log("Fetched heats for round", round.id, ":", heats);

//       for (const heat of heats) {
//         // Fetch competitors for each heat
//         const competitorsResult = await pool.query(
//           `SELECT c.id, c.name 
//            FROM competitors c
//            JOIN heat_competitors hc ON hc.competitor_id = c.id
//            WHERE hc.heat_id = $1`,
//           [heat.id]
//         );
//         heat.competitors = competitorsResult.rows;
//         console.log(
//           "Fetched competitors for heat",
//           heat.id,
//           ":",
//           heat.competitors
//         );
//       }
//       round.heats = heats;
//     }

//     console.log(
//       "Fetched rounds with details:",
//       JSON.stringify(rounds, null, 2)
//     );
//     res.status(200).json(rounds);
//   } catch (error) {
//     console.error("Error fetching rounds:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Add Score
router.post("/add-score", async (req, res) => {
  const { competitor_id, judge_id, score } = req.body;
  try {
    const newScore = await pool.query(
      "INSERT INTO scores (competitor_id, judge_id, score) VALUES ($1, $2, $3) RETURNING *",
      [competitor_id, judge_id, score]
    );
    res.status(201).json(newScore.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Scores by Heat ID
router.get("/get-scores/:heat_id", async (req, res) => {
  const { heat_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT s.id, s.competitor_id, s.judge_id, s.score
           FROM scores s
           JOIN heat_competitors hc ON s.competitor_id = hc.competitor_id
           WHERE hc.heat_id = $1`,
      [heat_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Advance Competitors to Next Round
router.post("/advance-competitors", async (req, res) => {
  const { current_round_id, next_round_id } = req.body;
  try {
    const topCompetitors = await pool.query(
      `SELECT s.competitor_id
           FROM scores s
           JOIN heat_competitors hc ON s.competitor_id = hc.competitor_id
           JOIN heats h ON hc.heat_id = h.id
           WHERE h.round_id = $1
           GROUP BY s.competitor_id
           ORDER BY SUM(s.score) DESC
           LIMIT 2`,
      [current_round_id]
    );
    const heatName = `Heat 1 - Round ${next_round_id}`;
    const newHeat = await pool.query(
      "INSERT INTO heats (round_id, heat_name) VALUES ($1, $2) RETURNING *",
      [next_round_id, heatName]
    );
    const heatId = newHeat.rows[0].id;
    for (const competitor of topCompetitors.rows) {
      await pool.query(
        "INSERT INTO heat_competitors (heat_id, competitor_id) VALUES ($1, $2)",
        [heatId, competitor.competitor_id]
      );
    }
    res.status(200).json({ message: "Competitors advanced successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Endpoint to generate PDF using saved rounds data
router.post("/generate-rounds-pdf", async (req, res) => {
  const { eventId, rounds } = req.body;

  try {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=rounds.pdf");
    doc.pipe(res);

    doc.fontSize(20).text(`Rounds for Event ${eventId}`, { align: "center" });
    doc.moveDown();

    for (const round of rounds) {
      doc.fontSize(16).text(`Round: ${round.name}`, { align: "left" });
      doc.fontSize(12).text(`Category: ${round.category}`, { align: "left" });
      //doc.fontSize(12).text(`Sub Category: ${round.sub_category}`, { align: 'left' });
      //doc.fontSize(12).text(`Board Type: ${round.board_type}`, { align: 'left' });
      doc.fontSize(12).text(`Gender: ${round.gender}`, { align: "left" });
      doc
        .fontSize(12)
        .text(`Age Category: ${round.age_category}`, { align: "left" });
      doc.moveDown();

      for (const heat of round.heats) {
        doc.fontSize(14).text(`Heat: ${heat.name}`, { align: "left" });
        doc.fontSize(12).text(`Competitors:`, { align: "left" });
        heat.competitors.forEach((competitor, idx) => {
          doc
            .fontSize(12)
            .text(`${idx + 1}. ${competitor.name}`, { align: "left" });
        });
        doc.moveDown();
      }
    }

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
