import { useState, useEffect } from "react";
import axios from "axios";
import Tablec from "../components/Tablec"; 
import PaginationBtn from "../components/PaginationBtn"; 

function ClientTable() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [clientsPerPage] = useState(10); 

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/Qzn5ap/data") 
      .then((response) => {
        const totalClients = response.data;
        setClients(totalClients);
        setTotalPages(Math.ceil(totalClients.length / clientsPerPage)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching clients:", err);
        setLoading(false);
      });
  }, []);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4" style={{color: '#4D869C' }}>
        Clients List
      </h1>
      {loading ? (
        <p style={{ fontSize: '1.2rem', color: '#7AB2B2' }}>Loading clients...</p>
      ) : (
        <>
          <Tablec clients={currentClients} />
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
