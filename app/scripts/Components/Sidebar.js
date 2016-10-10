import _ from 'underscore';
import React from 'react';
import {Link} from 'react-router';

import store from '../store';
import LoginModal from './LoginModal';

export default React.createClass({
  getInitialState() {
    if (store.session.get('userId')) {
      return {loggedIn: true, showLogin: false};
    } else {
      return {loggedIn: false, showLogin: false};
    }
  },
  setSession() {
    if (store.session.get('userId')) {
      this.setState({loggedIn: true});
    } else {
      this.setState({loggedIn: false});
    }
  },
  showLogin() {
    this.setState({showLogin: !this.state.showLogin});
  },
  hideLogin() {
    this.setState({showLogin: false})
  },
  updateAlerts() {
    this.setState({todayTasks: store.todayTasks.length})
    this.setState({importantTasks: store.importantTasks.length})
  },
  componentDidMount() {
    store.todayTasks.on('update', this.updateAlerts);
    store.importantTasks.on('update', this.updateAlerts);
    store.todayTasks.getTasks();
    store.importantTasks.getTasks();
    store.session.on('change', this.setSession)
    document.querySelector('aside').classList.add('show');
  },
  componentWillUnmount() {
    store.todayTasks.off('update', this.updateAlerts);
    store.importantTasks.off('update', this.updateAlerts);
    store.tasksCollection.off('update change', this.updateToday);
    store.session.off('change', this.setSession)
  },
  logout() {
    store.session.logout()
  },
  render() {
    console.log(this.state);
    let loginBtns;
    let modal;
    let todayTasks;
    let importantTasks;
    if (this.state.loggedIn) {
      loginBtns = (<p onClick={this.logout}>Logout</p>);
    } else {
      loginBtns = (<p onClick={this.showLogin}>Login</p>);
    }
    if (this.state.showLogin) {
      modal = <LoginModal hideModal={this.hideLogin}/>
    }
    if (this.state.todayTasks) {
      todayTasks = this.state.todayTasks;
      importantTasks = this.state.importantTasks;
      if (todayTasks === 0) {
        document.getElementById('today-task-alert').style.display = 'none';
      }
      if (importantTasks === 0) {
        document.getElementById('important-task-alert').style.display = 'none';
      }
    }
    return (
      <aside>
        <Link to="/">Home</Link>
        <Link to="/today">Today<span id="today-task-alert">{todayTasks}</span></Link>
        <Link to="/important">Important<span id="important-task-alert">{importantTasks}</span></Link>
        {loginBtns}
        {modal}
      </aside>
    );
  }
});
