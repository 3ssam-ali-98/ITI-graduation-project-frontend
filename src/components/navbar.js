import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';

function Navbar(){

    const navigate = useHistory();
    const dispatch = useDispatch();
    const name = useSelector((state) => state.user.name)

    return(
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav d-flex justify-content-between w-100">
                    <div className="d-flex">
                        <button className="nav-link" aria-current="page" onClick={() => navigate.push('/')}>Home</button>
                        {name && (<button className="nav-link" >Logged in as ({name})</button>)}
                    </div>
                    <div className="d-flex">
                        {name ? null : (<button className="btn btn-primary m-2" aria-current="page" onClick={() => navigate.push('/login')}>login</button>)}
                        {name ? null : (<button className="btn btn-success m-2" onClick={() => navigate.push('/register')}>Register</button>)}
                        {name && (<button className="btn btn-danger m-2" onClick={() => dispatch(loggedUser(''))}>Log out</button>)}
                    </div>
                </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar