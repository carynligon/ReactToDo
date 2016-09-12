import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import App from './Components/Pages/App';
import NewList from './Components/Pages/NewList';
import ViewList from './Components/Pages/ViewList';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/new-list" component={NewList}/>
    <Route path="/list/:id" component={ViewList}/>
  </Router>
);

export default router;
