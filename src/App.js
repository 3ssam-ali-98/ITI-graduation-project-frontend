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
import Analytics from './pages/Analytics';
import PremiumPage from './pages/PremiumPage';
// import PaymentSuccess from './pages/paymentsucess';
import BusinessDetails from './pages/BusinessDetails';
import PaymentResult from './pages/paymentsucess';
import AdminLogin from './pages/admin-login';
import AdminDashboard from './pages/admin-dashboard';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          
            <Switch>
              <Route path="/" component={LandingPage } exact />
              <Route path="/services" component={Services } exact />
              <Route path="/about" component={AboutUs } exact />
              <Route path="/contact" component={ContactUs } exact />
              <div class="container">
                <Route path="/tasks" component={TaskList } exact />
                <Route path="/profile" component={Profile } exact />
                <Route path="/dashboard" component={Dashboard} exact/>
                <Route exact path="/create-task" component={CreateTask}/>
                <Route exact path="/edit-task/:task_id" component={EditTask}/>
                <Route path="/clients" component={ClientTable} exact/>
                <Route path="/clients/:client_id" component={ClientDetails} exact/>
                <Route path="/tasks/:task_id" component={TaskDetails} exact/>
                <Route path="/businessdetail/:id" component={BusinessDetails} exact/>
                {/* <div className='d-flex container-fluid flex-wrap align-content-center justify-content-center'> */}
                  <Route exact path="/add-client" component={Addclient}/>
                  <Route exact path="/edit-client/:client_id" component={Editclient}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/admin-login" component={AdminLogin}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/edit-profile" component={EditProfile}/>
                  <Route exact path="/employees" component={EmployeesTable} />
                  <Route exact path="/add-employee" component={AddEmployee}/>
                  <Route exact path="/analytics" component={Analytics} />
                  <Route exact path="/premium" component={PremiumPage}/>
                  <Route path="/payment-result" component={PaymentResult} />
                  <Route path="/admin-dashboard" component={AdminDashboard} />
                {/* </div> */}
              </div>
            </Switch>
          
        </BrowserRouter>
    </div>
  );
}

export default App;
