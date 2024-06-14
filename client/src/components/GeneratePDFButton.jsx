import React from "react";
import axios from "axios";

const GeneratePDFButton = ({ eventId, rounds }) => {
  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/event-admin/generate-rounds-pdf`,
        {
          eventId,
          rounds,
        },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rounds.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF");
    }
  };

  return (
    <button className="btn btn-secondary mt-0" onClick={handleGeneratePDF}>
      Generate PDF
    </button>
  );
};

export default GeneratePDFButton;
