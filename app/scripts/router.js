import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import App from './Components/Pages/App';
import NewList from './Components/Pages/NewList';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/new-list" component={NewList}/>
  </Router>
);

export default router;
