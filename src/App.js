import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import FullMenu from './components/Menu/FullMenu';
import { MenuProvider } from './StoreLogic/store';
import CheckOut from './components/CheckOut/CheckOut';

function App() {
  // use effect to get full menu

  return (
    <Router>
      <Switch>
        <MenuProvider>
          <Route path="/" exact component={FullMenu} />
          <Route path="/checkout" exact component={CheckOut} />
        </MenuProvider>
      </Switch>
    </Router>

  );
}

export default App;
