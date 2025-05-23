import { useState, useEffect } from "react";
import axios from "axios";
// import Tablec from "../components/Tablec";
import PaginationBtn from "../components/PaginationBtn";
import Button from "../components/button";
import { useHistory } from "react-router-dom";
import Modal from "../components/modal";



function EmployeesTable() {
	const [employees, setEmployee] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [employeesPerPage] = useState(10);
	const [filteredEmployees, setFilteredEmployees] = useState(employees);
	
	// const [searchQuery, setSearchQuery] = useState('');
	const history = useHistory();
	// const { bussiness_id } = useParams();
	const token = sessionStorage.getItem("token");
	const id = sessionStorage.getItem("id");
	
		useEffect(() => {
				if(!id)
					history.push('/')
			}, [id, history])

	const fetchEmployees = () => {
		axios.get("http://127.0.0.1:8000/employees/",
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				const totalEmployees = response.data;
				setEmployee(totalEmployees);
				setFilteredEmployees(totalEmployees)
				setTotalPages(Math.ceil(totalEmployees.length / employeesPerPage));
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

		fetchEmployees();
	},[]);

	const deleteEmployeeHandler = (e) => {

		axios.delete(`http://127.0.0.1:8000/employees/${e}/`,{
			headers: {
				Authorization: `Bearer ${token}`

			}
		})
			.then((response) => {
				fetchEmployees();
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
			})
	}

	const indexOfLastEmployee = currentPage * employeesPerPage;
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
	const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const searchfunc = (e) => {
		const query = e.target.value.toLowerCase();
		// setSearchQuery(query);

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
					<Modal
						id="modal"
						hidden={true} 
						target="session-modal"
						modal_title={"Session expired!"} 
						modal_message={"Your login Session has expired, please login again"} 
						modal_accept_text={"Go To Login"} 
						modal_accept={() => history.push('/login')} 
						modal_close={() => history.push('/login')} 
					/>

					<div className="d-flex justify-content-center align-items-center mt-3">
						<Button bclr={"success"} title1={"Add employee"} clck={() => history.push(`/add-employee`)} />
					</div>   

					<table className="table table-responsive table-striped table-bordered " style={{ borderColor: "#4D869C", color: "#4D869C", }}>
						<thead style={{ backgroundColor: "#EEF7FF", color: "#4D869C" }}>
							<tr className="align-text-center">
								<th className="text-center">Name</th>
								<th className="text-center">Phone</th>
								<th className="text-center">Email</th>
								<th className="text-center">Options</th>
							</tr>
						</thead>
						<tbody style={{ backgroundColor: "#CDE8E5" }}>
								{currentEmployees.map((employee, index) => (
								<tr style={{ borderBottom: "1px solid #7AB2B2" }}>
									<td>
											{employee.first_name} {employee.last_name}
									</td>
									<td>{employee.mobile_phone}</td>
									<td>{employee.email}</td>
									<td className="d-flex justify-content-around align-items-center">
										<Modal
											modal_button_text={"Delete"}
											target="delete-modal"
											modal_title={"Removal Confirmation"}
											modal_message={"Are you sure you want to delete?"}
											modal_reject_text={"No, Cancel"}
											modal_accept_text={"Yes, I am sure"}
											modal_accept={() => deleteEmployeeHandler(employee.id)}
										/>

									</td>
								</tr>
							))}
						</tbody>
					</table>
					<PaginationBtn
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			)}
			<div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                    <Button bclr="primary" clck={()=> history.push("/dashboard")} title1={"Go Back"} />
            </div>
		</div>
	);
}

export default EmployeesTable;
