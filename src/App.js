import './App.css';
import Login from './pages/login';
import Register from './pages/regeister';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <div className='d-flex contaner-fluid flex-wrap justify-content-center'>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </Switch>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
