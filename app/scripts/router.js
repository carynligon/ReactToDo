import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import App from './Components/Pages/App';
import NewList from './Components/Pages/NewList';
import ViewList from './Components/Pages/ViewList';
import DueToday from './Components/Pages/Today';
import Completed from './Components/Pages/Completed';
import NotCompleted from './Components/Pages/NotCompleted';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/new-list" component={NewList}/>
    <Route path="/list/:id" component={ViewList}/>
    <Route path="/today" component={DueToday}/>
    <Route path="/completed" component={Completed}/>
    <Route path="/notcompleted" component={NotCompleted}/>
  </Router>
);

export default router;
