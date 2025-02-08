import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Tablec({ clients }) {
  const bussiness_id = useParams().bussiness_id;

  

  
  return (
    <table className="table table-striped table-bordered" style={{ borderColor: "#4D869C", color: "#4D869C" }}>
      <thead style={{ backgroundColor: "#EEF7FF", color: "#4D869C" }}>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Company</th>
          <th>Position</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "#CDE8E5" }}>
        {clients.map((client) => (
          <tr key={client.id} style={{ borderBottom: "1px solid #7AB2B2" }}>
            <td>{client.id}</td>
            <td>
              <Link
                to={`/${bussiness_id}/clients/company-details/${client.id}`}
                style={{ color: "#4D869C", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#7AB2B2")}
                onMouseLeave={(e) => (e.target.style.color = "#4D869C")}
              >
                {client["Column 1"]}
              </Link>
            </td>
            <td>{client["Column 2"]}</td>
            <td>{client["Column 3"]}</td>
            <td>{client["Column 4"] || "N/A"}</td>
            <td>{client["Column 5"] || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tablec;
