import React from "react";
import axios from "axios";

const GeneratePDFButton = ({ eventId }) => {
  const handleGeneratePDF = async () => {
    try {
      const roundsResponse = await axios.get(
        `http://localhost:3000/event-admin/get-rounds/${eventId}`
      );
      const rounds = roundsResponse.data;

      console.log("Rounds data for PDF:", rounds);

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
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
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
