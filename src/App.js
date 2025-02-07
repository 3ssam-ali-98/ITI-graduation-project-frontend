import './App.css';
import Navbar from './pages/Navbar';
import HeroSection from './pages/HeroSection';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './pages/Footer';
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
        <Switch>
          <Route path="/services" component={Services } exact />
          <Route path="/about" component={AboutUs } exact />
          <Route path="/contact" component={ContactUs } exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
