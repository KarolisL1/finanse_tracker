// import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import NewItem from './components/NewItem';
import EditItem from './components/EditItem';
// import Chart from './components/Chart';
import Main from './components/Main';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/new">
            <NewItem />
          </Route>
          <Route exact path="/expenses/:id/edit">
            <EditItem />
          </Route>
          <Route exact path="/chart">
            <Main />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
