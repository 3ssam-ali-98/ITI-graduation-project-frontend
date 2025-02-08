
import Navbar from './pages/Navbar';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/login';
import Register from './pages/regeister';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './pages/landingpage';
import Dashboard from './pages/dashoboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={LandingPage } exact />
          <Route path="/services" component={Services } exact />
          <Route path="/about" component={AboutUs } exact />
          <Route path="/contact" component={ContactUs } exact />
          <Route path="/:bussiness_id/dashboard" component={Dashboard} exact />
          <div className='d-flex container-fluid flex-wrap align-content-center justify-content-center'>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
