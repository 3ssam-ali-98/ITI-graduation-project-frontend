import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Button from "./button";
import { useHistory } from "react-router-dom";
import Modal from "./modal";
import { useState } from "react";

function Tablec({ clients, deleteclientHandler, pagesnumber }) {
  const { bussiness_id } = useParams();
  // const history = useHistory();
  const [clientId, setProductId] = useState(null);

  const getclientid = (e) => {
    setProductId(e)
  }

  const deletclient = (e) => {
    deleteclientHandler(e)
  }

  const moreDetails = (client_id) => {
    return `/${bussiness_id}/clients/${client_id}`
  }

  return (
    <>
      <table className="table table-responsive table-striped table-bordered " style={{ borderColor: "#4D869C", color: "#4D869C",  }}>
        <thead style={{ backgroundColor: "#EEF7FF", color: "#4D869C" }}>
          <tr className="align-text-center">
            <th className="text-center">ID</th>
            <th className="text-center">Name</th>
            <th className="text-center">Phone</th>
            <th className="text-center">Email</th>
            <th className="text-center">Address</th>
            <th className="text-center">Options</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#CDE8E5" }}>
          {clients.map((client ,index) => (
            <tr key={client.id} style={{ borderBottom: "1px solid #7AB2B2" }}>
              <td>{client.id}</td>
              <td><Link to={{ pathname: `${moreDetails(client.id)}`, state: { index } }}>{client.name}</Link></td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
              <td className="d-flex justify-content-around align-items-center">
                <Modal 
                  modal_button_text={"Delete"} 
                  modal_title={"Removal Confirmation"} 
                  modal_message={"Are you sure you want to delete?"} 
                  modal_reject_text={"No, Canecl"} 
                  modal_accept_text={"Yes, I am sure"} 
                  modal_button={() => getclientid(client.id)} 
                  modal_accept={() => deletclient(clientId)} 
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tablec;
