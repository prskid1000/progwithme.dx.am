import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/index.js';
import Accounts from './components/account.js';
import Chat from './components/chat.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Accounts} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;