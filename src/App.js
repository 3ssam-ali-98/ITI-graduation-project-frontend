import Navbar from './pages/Navbar';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/login';
import Register from './pages/regeister';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './pages/landingpage';
import Dashboard from './pages/dashoboard';
import ClientTable from './pages/ClientTable';
import ClientDetails from './pages/ClientDetails';
import Addclient from './pages/addclient';
import Editclient from './pages/editclient';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/UpdateTask';
import AddEmployee from './pages/addemployee'
import Profile from './pages/profile';
import EmployeesTable from './pages/EmployeesTable'; 
import EditProfile from './pages/editprofile';
import TaskDetails from "./pages/TaskDetails";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          <div class="container">
            <Switch>
              <Route path="/" component={LandingPage } exact />
              <Route path="/services" component={Services } exact />
              <Route path="/about" component={AboutUs } exact />
              <Route path="/contact" component={ContactUs } exact />
              <Route path="/:bussiness_id/tasks" component={TaskList } exact />
              <Route path="/profile" component={Profile } exact />
              <Route path="/:bussiness_id/dashboard" component={Dashboard} exact/>
              <Route exact path="/:bussiness_id/create-task" component={CreateTask}/>
              <Route exact path="/:bussiness_id/edit-task/:task_id" component={EditTask}/>
              <Route path="/:bussiness_id/clients" component={ClientTable} exact/>
              <Route path="/:bussiness_id/clients/:client_id" component={ClientDetails} exact/>
              {/* <div className='d-flex container-fluid flex-wrap align-content-center justify-content-center'> */}
                <Route exact path="/:bussiness_id/add-client" component={Addclient}/>
                <Route exact path="/:bussiness_id/edit-client/:client_id" component={Editclient}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/edit-profile" component={EditProfile}/>
                <Route exact path="/:bussiness_id/employees" component={EmployeesTable} />
                <Route exact path="/:bussiness_id/add-employee" component={AddEmployee}/>
              {/* </div> */}
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
