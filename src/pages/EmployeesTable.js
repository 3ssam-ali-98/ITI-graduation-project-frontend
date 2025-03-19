import { useState, useEffect } from "react";
import axios from "axios";
import Tablec from "../components/Tablec";
import PaginationBtn from "../components/PaginationBtn";
import Button from "../components/button";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';


function EmployeesTable() {
	const [employees, setEmployee] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [employeesPerPage] = useState(10);
	const [filteredEmployees, setFilteredEmployees] = useState(employees);
	const [searchQuery, setSearchQuery] = useState('');
	const history = useHistory();
	const { bussiness_id } = useParams();
	console.log(employees);
	

    // const employees = JSON.parse(localStorage.getItem("usersdata"))?.filter(user => user.type === "Employee" && user.id === businessId) || [];


	const fetchEmployees = () => {
		axios.get("http://127.0.0.1:8000/employees/")
			.then((response) => {
				const totalEmployees = response.data;
				setEmployee(totalEmployees);
				setFilteredEmployees(totalEmployees)
				setTotalPages(Math.ceil(totalEmployees.length / employeesPerPage));
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching employees:", err);
				setLoading(false);
			});
	}


	useEffect(() => {

		fetchEmployees();
	}, []);

	const deleteEmployeeHandler = (e) => {
		axios.delete(`http://127.0.0.1:8000/employees/${e}/`)
			.then((response) => {
				fetchEmployees();
			})
			.catch((err) => console.log('Error deleting Employee:', err))
	}

	const indexOfLastEmployee = currentPage * employeesPerPage;
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
	const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const searchfunc = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = employees.filter(emp =>
			emp.name.toLowerCase().includes(query)
		);

		setFilteredEmployees(filtered);
		setTotalPages(Math.ceil(filtered.length / employeesPerPage));
	}

	return (
		<div className="container my-4">
			<h1 className="text-center mb-4" style={{ color: '#4D869C' }}>
				Employees List
			</h1>
			{loading ? (
				<p style={{ fontSize: '1.2rem', color: '#7AB2B2' }}>Loading Employees...</p>
			) : (
				<>
					<div className="mb-3" >
						<form class="d-flex justify-content-center" role="search">
							<input class="form-control me-2 w-25" type="search" placeholder="Search Employees" aria-label="Search" onChange={searchfunc} />
							<button class="btn btn-outline-primary" type="submit">Search</button>
						</form>
					</div>

					<div className="d-flex justify-content-center align-items-center mt-3">
						<Button bclr={"success"} title1={"Add employee"} clck={() => history.push(`/${bussiness_id}/add-employee`)} />
					</div>   
					<Tablec clients={currentEmployees} deleteclientHandler={deleteEmployeeHandler} pagesnumber={currentPage} />
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

export default EmployeesTable;
