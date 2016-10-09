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
  componentDidMount() {
    store.session.on('change', this.setSession)
    document.querySelector('aside').classList.add('show');
  },
  componentWillUnmount() {
    store.session.off('change', this.setSession)
  },
  logout() {
    store.session.logout()
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
      modal = <LoginModal hideModal={this.hideLogin}/>
    }
    return (
      <aside>
        <Link to="/">Home</Link>
        <Link to="/today">Today</Link>
        <a href="#">Important</a>
        {loginBtns}
        {modal}
      </aside>
    );
  }
});
