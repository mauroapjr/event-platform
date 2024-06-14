import React, { useState } from "react";
import axios from "axios";

const categories = ["Shortboard", "Longboard"];
const subCategories = ["Men", "Women"];
const ageCategories = [
  "Open",
  "Sub12",
  "Sub14",
  "Sub18",
  "Professional",
  "+40",
  "+45",
  "+50",
  "+60",
  "+65",
  "+70",
];

const AddCompetitorForm = ({
  eventId,
  fetchCompetitors,
  selectedEventName,
}) => {
  const [competitorName, setCompetitorName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [subCategory, setSubCategory] = useState(subCategories[0]);
  const [boardType, setBoardType] = useState(categories[0]);
  const [gender, setGender] = useState(subCategories[0]);
  const [ageCategory, setAgeCategory] = useState(ageCategories[0]);

  const handleAddCompetitor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/event-admin/add-competitor", {
        name: competitorName,
        event_id: eventId,
        category,
        sub_category: subCategory,
        board_type: boardType,
        gender,
        age_category: ageCategory,
      });
      alert("Competitor added successfully");
      setCompetitorName("");
      setCategory(categories[0]);
      setSubCategory(subCategories[0]);
      setBoardType(categories[0]);
      setGender(subCategories[0]);
      setAgeCategory(ageCategories[0]);
      fetchCompetitors(eventId, selectedEventName);
    } catch (error) {
      console.error("Error adding competitor:", error);
      alert("Error adding competitor");
    }
  };

  return (
    <form onSubmit={handleAddCompetitor} className="mb-4">
      <div className="form-group">
        <label>Competitor Name:</label>
        <input
          type="text"
          className="form-control"
          value={competitorName}
          onChange={(e) => setCompetitorName(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label>Category:</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Sub Category:</label>
        <select
          className="form-control"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((subCat) => (
            <option key={subCat} value={subCat}>
              {subCat}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Board Type:</label>
        <select
          className="form-control"
          value={boardType}
          onChange={(e) => setBoardType(e.target.value)}
          required
        >
          <option value="">Select Board Type</option>
          {categories.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Gender:</label>
        <select
          className="form-control"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          {subCategories.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Age Category:</label>
        <select
          className="form-control"
          value={ageCategory}
          onChange={(e) => setAgeCategory(e.target.value)}
          required
        >
          <option value="">Select Age Category</option>
          {ageCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Add Competitor
      </button>
    </form>
  );
};

export default AddCompetitorForm;
