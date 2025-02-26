

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
import CompanyDetails from './pages/ClientDetails';
import Addclient from './pages/addclient';
import Editclient from './pages/editclient';
import CreateTask from './pages/CreateTask';

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
          <Route path="/:bussiness_id/dashboard" component={Dashboard} exact/>
          <Route exact path="/:bussiness_id/create-task" component={CreateTask}/>
          <Route path="/:bussiness_id/clients" component={ClientTable} exact/>
          <Route path="/:bussiness_id/clients/:id" component={CompanyDetails} exact/>
          <div className='d-flex container-fluid flex-wrap align-content-center justify-content-center'>
            <Route exact path="/:bussiness_id/add-client" component={Addclient}/>
            <Route exact path="/:bussiness_id/edit-client/:id" component={Editclient}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
