import React from 'react';
import Users from "./components/users/Users";

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Projects from "./components/projects/Projects";
import Tracker from "./components/tracker/Tracker";
import Home from "./components/home/Home";

const App = () => (

  <BrowserRouter>
    <Switch>
      <Route path="/users">
        <Users/>
      </Route>
      <Route path="/projects">
        <Projects/>
      </Route>
      <Route path="/tracker">
        <Tracker/>
      </Route>

      <Route>
        <Home/>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
