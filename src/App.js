import Navbar from './pages/Navbar';
import HeroSection from './pages/HeroSection';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './pages/Footer';
import Login from './pages/login';
import Register from './pages/regeister';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <HeroSection />
        <Services />
        <AboutUs />
        <ContactUs />
        <Footer />
    <div className='d-flex contaner-fluid flex-wrap justify-content-center'>
        <Switch>
          <Route path="/services" component={Services } exact />
          <Route path="/about" component={AboutUs } exact />
          <Route path="/contact" component={ContactUs } exact />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
        </Switch>
    </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
