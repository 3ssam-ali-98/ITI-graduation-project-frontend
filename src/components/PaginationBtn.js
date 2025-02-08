import React from "react";

function PaginationBtn({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <button
        className="btn mx-2"
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          backgroundColor: "#4D869C",
          borderColor: "#4D869C",
          color: "#EEF7FF",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#7AB2B2")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4D869C")}
      >
        Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`btn mx-1 ${currentPage === number ? "active" : ""}`}
          onClick={() => onPageChange(number)}
          style={{
            backgroundColor: currentPage === number ? "#7AB2B2" : "#EEF7FF",
            color: currentPage === number ? "#4D869C" : "#4D869C",
            borderColor: "#7AB2B2",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#7AB2B2")}
          onMouseOut={(e) => (e.target.style.backgroundColor = currentPage === number ? "#7AB2B2" : "#EEF7FF")}
        >
          {number}
        </button>
      ))}

      <button
        className="btn mx-2"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          backgroundColor: "#4D869C",
          borderColor: "#4D869C",
          color: "#EEF7FF",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#7AB2B2")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4D869C")}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationBtn;
