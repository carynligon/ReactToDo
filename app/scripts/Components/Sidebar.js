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
  updateToday() {
    let allTasks = store.tasksCollection.toJSON();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    let todayTasks = _.where(allTasks, {due: today});
    console.log(todayTasks);
    if (!todayTasks) {
      this.setState({todayTasks: 0})
    } else {
      this.setState({todayTasks: todayTasks.length})
    }
  },
  componentDidMount() {
    this.updateToday();
    store.session.on('change', this.setSession)
    document.querySelector('aside').classList.add('show');
  },
  componentWillUnmount() {
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
    }
    return (
      <aside>
        <Link to="/">Home</Link>
        <Link to="/today">Today<span id="today-task-alert">{todayTasks}</span></Link>
        <a href="#">Important</a>
        {loginBtns}
        {modal}
      </aside>
    );
  }
});
