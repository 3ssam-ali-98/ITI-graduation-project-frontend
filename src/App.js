import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientTable from './pages/ClientTable';
import CompanyDetails from './pages/ClientDetails';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ClientTable} />
        <Route path="/company-details/:id" component={CompanyDetails} />
      </Switch>
    </Router>
  );
}

export default App;
