import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/search/:searchString/:searchType">
            <SearchResults />
          </Route>
          {/* <Route path="/about">
          <About />
          </Route>
          <Route path="/dashboard">
          <Dashboard />
        </Route> */}
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
