import { useHistory } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useSelector, useDispatch} from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';
// import { Userid } from '../redux/actions/loggeduseraction';

function Navbar() {

    const logout = () => {
        dispatch(loggedUser(''))
        localStorage.removeItem("token");
        // localStorage.removeItem("user_id");
        localStorage.removeItem("role");
        // dispatch(Userid(''))
    }

    const history = useHistory();
    const dispatch = useDispatch();
    const name = useSelector((state) => state.user.user.name)
    // const role = useSelector((state) => state.user.user.role)
    // console.log(useSelector((state) => state.user.user))
    const id = useSelector((state) => state.user.user.id)
    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#4D869C" }}>
            <div className="container">
                <HashLink className="navbar-brand text-white" smooth to="/">Management App</HashLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {name && (<div className="d-flex flex-row">
                    <button className="nav-link text-white" onClick={() => history.push(`/profile`)} style={{marginRight : '10px'}}>Welcome back, {name.split(" ")[0]}</button> 
                    <button className="nav-link text-white" style={{marginRight : '10px'}} onClick={() => history.push(`/${id}/dashboard`)}>Buissness insights</button>
                    {/* <button className="nav-link text-white" onClick={() => history.push(`/${id}/add-employee`)} style={{marginRight : '10px'}}>Add employee</button> */}

                </div>)}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#hero-section">Home</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#services">Services</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#about">About Us</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#contact">Contact Us</HashLink></li>
                    </ul>
                    <div className="d-flex gap-2">
                    {name ? null : (<button className="btn btn-light" onClick={() => history.push('/login')}>Login</button>)}
                    {name ? null : (<button className="btn btn-primary" onClick={() => history.push('/register')}>Register</button>)}
                    {name && (<button className="btn btn-danger m-2" onClick={logout}>Log out</button>)}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
