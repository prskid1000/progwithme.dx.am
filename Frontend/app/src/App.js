import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/index.js';
import Accounts from './components/account.js';
import createPost from './components/createpost.js';
import viewPosts from './components/viewposts.js';
import postView from './components/postview.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Accounts} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/createpost" component={createPost} />
        <Route exact path="/viewposts" component={viewPosts} />
        <Route exact path="/postview" component={postView} />
      </Switch>
    </Router>
  );
}

export default App;