import React from 'react';
import {Link} from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState() {
    if (store.session.get('userId')) {
      return {loggedIn: true};
    } else {
      return {loggedIn: false};
    }
  },
  setSession() {
    if (store.session.get('userId')) {
      this.setState({loggedIn: true});
    } else {
      this.setState({loggedIn: false});
    }
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
    if (this.state.loggedIn) {
      loginBtns = (<p onClick={this.logout}>Logout</p>);
    } else {
      loginBtns = (<p>Login</p>);
    }
    return (
      <aside>
        <Link to="/">Home</Link>
        <a href="#">Today</a>
        <a href="#">Important</a>
        {loginBtns}
      </aside>
    );
  }
});
