import React from "react";

function Dcard(props) {
  return (
    <div
      className="card shadow-lg border-0 rounded d-flex flex-column"
      style={{
        backgroundColor: "#EEF7FF", 
        color: "#4D869C",
        borderRadius: "15px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        maxWidth: "1200px", 
        width: "100%"
      }}
    >
      <div className="col-12">
        <img
          src={props.posterPath}
          alt={props.name}
          className="img-fluid rounded-top w-100"
          style={{
            height: "auto", 
            maxHeight: "500px",
            maxWidth: "100%",  
            objectFit: "cover",
            borderRadius: "15px 15px 0 0" 
          }}
        />
      </div>

      <div className="col-12 d-flex flex-column align-items-start">
        <div className="card-body">
          <h1
            className="card-title"
            style={{
              color: "#7AB2B2", 
              fontSize: "2rem", 
              fontWeight: "bold"
            }}
          >
            {props.name}
          </h1>
          <h4
            className="text-muted"
            style={{
              color: "#CDE8E5", 
              fontSize: "1.5rem"
            }}
          >
            {props.company}
          </h4>
          <p className="card-text mt-3" style={{ color: "#4D869C" }}>
            <strong>Position:</strong> {props.position}
          </p>
          <p style={{ color: "#4D869C" }}>
            <strong>Phone:</strong> {props.phone}
          </p>
          <p style={{ color: "#4D869C" }}>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${props.email}`}
              style={{ color: "#7AB2B2", textDecoration: "none" }}
            >
              {props.email}
            </a>
          </p>
          <p style={{ color: "#4D869C" }}>
            <strong>Department:</strong> {props.department}
          </p>
          <p style={{ color: "#4D869C" }}>
            <strong>Location:</strong> {props.location}
          </p>
          <p style={{ color: "#4D869C" }}>
            <strong>Website:</strong>{" "}
            <a
              href={props.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#7AB2B2", textDecoration: "none" }}
            >
              {props.website}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dcard;
