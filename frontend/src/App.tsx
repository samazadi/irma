import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/search/:searchString?/:searchType?">
            <Search />
          </Route>
          <Route exact path="/returns">
            <Home />
          </Route>
          <Route exact path="/donate">
            <Home />
          </Route>
          <Route exact path="/reports">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
