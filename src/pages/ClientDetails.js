import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dcard from "../components/Dcard"; 

function CompanyDetails() {
    const bussiness_id = useParams().bussiness_id;
    const { id } = useParams(); 
    const [company, setCompany] = useState(null); 
    const [loading, setLoading] = useState(true); 
    

    useEffect(() => {
        axios
            .get("https://retoolapi.dev/JjUxYA/clients") 
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
            <Dcard props={company}
                name={company.name} 
                // company={company["Column 2"]} 
                // position={company["Column 3"]} 
                phone={company.phone}
                email={company.email} 
                // department={company["Column 6"]} 
                // posterPath={company["Column 7"]} 
                location={company.address} 
                notes={company.notes} 
                // rating={company.rating}
                // website={company["Column 9"]} 
            />
        </div>
    );
}

export default CompanyDetails;
