// import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
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
  let [logInUserId, setLogInUserId] = useState('');
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard logInUserId = {logInUserId} setLogInUserId = {setLogInUserId}/>
          </Route>
          <Route exact path="/new">
            <NewItem logInUserId = {logInUserId}/>
          </Route>
          <Route exact path="/expenses/:id/edit">
            <EditItem />
          </Route>
          <Route exact path="/chart">
            <Main logInUserId = {logInUserId}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
