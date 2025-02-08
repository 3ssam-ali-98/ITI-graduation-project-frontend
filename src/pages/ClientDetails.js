import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dcard from "../components/Dcard"; 

function CompanyDetails() {
    const { id } = useParams(); 
    const [company, setCompany] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios
            .get("https://retoolapi.dev/Qzn5ap/data") 
            .then((response) => {
                const companyData = response.data.find((client) => client.id === parseInt(id)); 
                setCompany(companyData); 
                setLoading(false); 
            })
            .catch((err) => {
                console.error("Error fetching company details:", err);
                setLoading(false); 
            });
    }, [id]); 

    if (loading) {
        return <div>Loading company details...</div>; 
    }

    if (!company) {
        return <div>Company not found!</div>; 
    }

    return (
        <div className="container my-5">
            <Dcard
                name={company["Column 1"]} 
                company={company["Column 2"]} 
                position={company["Column 3"]} 
                phone={company["Column 4"]} 
                email={company["Column 5"]} 
                department={company["Column 6"]} 
                posterPath={company["Column 7"]} 
                location={company["Column 8"]} 
                website={company["Column 9"]} 
            />
        </div>
    );
}

export default CompanyDetails;
