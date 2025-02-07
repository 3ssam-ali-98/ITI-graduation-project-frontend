import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashoboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/:bussiness_id/dashboard" component={Dashboard} exact />
        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;
