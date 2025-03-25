import { useState, useEffect } from "react";
import axios from "axios";
import Tablec from "../components/Tablec";
import PaginationBtn from "../components/PaginationBtn";
import Button from "../components/button";
import Modal from '../components/modal';
import { useHistory } from "react-router-dom";
// import { useParams } from 'react-router-dom';


function ClientTable() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [clientsPerPage] = useState(10);
  const [filteredClients, setFilteredClients] = useState(clients);
  // const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  // const { bussiness_id } = useParams();
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("id");
  const role = sessionStorage.getItem("role");
  
    useEffect(() => {
        if(!id)
          history.push('/')
      }, [id, history])


  const fetchclients = () => {
    axios.get("http://127.0.0.1:8000/clients/",{
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
    .then((response) => {
      const totalClients = response.data;
      setClients(totalClients);
      setFilteredClients(totalClients)
      setTotalPages(Math.ceil(totalClients.length / clientsPerPage));
      setLoading(false);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) 
        {
          document.getElementById("modal").click();
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("name");
        }
      setLoading(false);
    });
  }


  useEffect(() => {

    fetchclients();
  },[] );

  const deleteclientHandler = (e) => {
    axios.delete(`http://127.0.0.1:8000/clients/${e}/`,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((response) => {
        console.log('Product deleted:', response.data)
        fetchclients();
      })
      .catch((error) => {if (error.response && error.response.status === 401) 
        {
          document.getElementById("modal").click();
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("name");
        }})
  }

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchfun = (e) => {
    const query = e.target.value.toLowerCase();
    // setSearchQuery(query);

    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(query)
    );

    setFilteredClients(filtered);
    setTotalPages(Math.ceil(filtered.length / clientsPerPage));

  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4" style={{ color: '#4D869C' }}>
        Clients List
      </h1>
      {loading ? (
        <p style={{ fontSize: '1.2rem', color: '#7AB2B2' }}>Loading clients...</p>
      ) : (
        <>
          <div className="mb-3" >
          <Modal
              id="modal"
              target="session-modal"
              hidden={true} 
              modal_title={"Session expired!"} 
              modal_message={"Your login Session has expired, please login again"} 
              modal_accept_text={"Go To Login"} 
              modal_accept={() => history.push('/login')} 
              modal_close={() => history.push('/login')} 
          />
            <form class="d-flex justify-content-center" role="search">
              <input class="form-control me-2 w-25" type="search" placeholder="Search Clients" aria-label="Search" onChange={searchfun} />
              <button class="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button bclr={"success"} title1={"Add Client"} clck={() => history.push(`/add-client`)} />
            </div>  
          <Tablec clients={currentClients} deleteclientHandler={deleteclientHandler} pagesnumber={currentPage} role={role} />
          <PaginationBtn
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default ClientTable;
