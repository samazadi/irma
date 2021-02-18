import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Donate from './pages/Donate';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Returns from './pages/Returns';
import Search from './pages/Search';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:searchString?/:searchType?" component={Search} />
        <Route path="/returns" component={Returns} />
        <Route path="/donate" component={Donate} />
        <Route path="/reports" component={Reports} />
      </Switch>
    </Router>
  );
}

export default App;
