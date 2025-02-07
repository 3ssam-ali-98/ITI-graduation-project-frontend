import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientTable from './pages/ClientTable';
import CompanyDetails from './pages/ClientDetails';


function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={ClientTable} />
        <Route path="/company-details/:id" component={CompanyDetails} /> */}

        <Route path="/:bussiness_id/clients" component={ClientTable} exact/>
        <Route path="/:bussiness_id/clients/company-details/:id" component={CompanyDetails} exact/>
      </Switch>
    </Router>
  );
}

export default App;
