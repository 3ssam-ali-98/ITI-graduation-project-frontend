import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';
import { useEffect } from 'react';

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => {
		console.log("Current Redux state:", state.loggeduser);
		return state.loggeduser.user;
	});

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername && !user.name) {
			dispatch(loggedUser({ name: storedUsername }));
		}
	}, [dispatch, user]);

	return (
		<nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav d-flex justify-content-between w-100">
						<div className="d-flex">
							<button className="nav-link" aria-current="page" onClick={() => navigate.push('/')}>Home</button>
							{user.name && (<button className="nav-link">Logged in as ({user.name})</button>)}
						</div>
						<div className="d-flex">
							{!user.name && (<button className="btn btn-primary m-2" onClick={() => navigate.push('/login')}>Login</button>)}
							{!user.name && (<button className="btn btn-success m-2" onClick={() => navigate.push('/register')}>Register</button>)}
							{user.name && (<button className="btn btn-danger m-2" onClick={() => {
								dispatch(loggedUser(''));
								localStorage.removeItem("username");
								navigate.push('/');
							}}>Log out</button>)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
