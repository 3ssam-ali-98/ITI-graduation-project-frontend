import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function Dcard(props) {

  // const location = useLocation();
  // const index = location.state.index;  
  const {client_id } = useParams();
  const history = useHistory();

  const build_client_update_url = (client_id) => {
    history.push(`/edit-client/${client_id}`);
    // return `/${bussiness_id}/clients/${client_id}`;
  }

  
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
      {/* <div className="col-12">
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
      </div> */}

      <div className="col-12 d-flex flex-column ">
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
          {/* <h4
            className="text-muted"
            style={{
              color: "#CDE8E5", 
              fontSize: "1.5rem"
            }}
          >
            {props.company}
          </h4> */}
          {/* <p className="card-text mt-3" style={{ color: "#4D869C" }}>
            <strong>Position:</strong> {props.position}
          </p> */}
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
          {/* <p style={{ color: "#4D869C" }}>
            <strong>Department:</strong> {props.department}
          </p> */}
          <p style={{ color: "#4D869C" }}>
            <strong>Location:</strong> {props.location}
          </p>

          {/* <p style={{ color: "#4D869C" }}>
            <strong>rating: </strong> {props.rating}
          </p> */}

          { props.notes !== '-' &&
            ( 
              <p style={{ color: "#4D869C" }}>
                <strong>notes:</strong>{" "}
                <span
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#7AB2B2", textDecoration: "none" }}
                >
                  {props.notes}
                </span>
              </p>
            )
          }
          <div className="d-flex justify-content-around align-items-center">
            <Link to={`/clients`} className="btn btn-danger" onClick={props.clcback}> Go back</Link>
            <button className="btn btn-warning" onClick={() => build_client_update_url(client_id)}> Edit client Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dcard;
