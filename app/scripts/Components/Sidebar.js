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
  componentDidMount() {
    store.session.on('change', this.setSession)
  },
  componentWillUnmount() {
    store.session.off('change', this.setSession)
  },
  logout() {
    store.session.logout()
    console.log(store.session);
  },
  render() {
    let loginBtns;
    let modal;
    if (this.state.loggedIn) {
      loginBtns = (<p onClick={this.logout}>Logout</p>);
    } else {
      loginBtns = (<p onClick={this.showLogin}>Login</p>);
    }
    if (this.state.showLogin) {
      modal = <LoginModal/>
    }
    return (
      <aside>
        <Link to="/">Home</Link>
        <a href="#">Today</a>
        <a href="#">Important</a>
        {loginBtns}
        {modal}
      </aside>
    );
  }
});
