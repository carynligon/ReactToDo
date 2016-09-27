import React from 'react';

import store from '../store';

export default React.createClass({
  login(e) {
    this.props.showLogin();
  },
  signup(e) {
    e.preventDefault();
    store.session.signup(this.refs.username.value, this.refs.password.value);
    this.props.hideModal();
  },
  render() {
    return (
      <form className="login-form" onSubmit={this.signup}>
      <h2>Signup</h2>
      <label htmlFor="username">username</label>
      <input type="text" name="username" id="username" ref="username"/>
      <label htmlFor="password">password</label>
      <input type="password" name="password" id="password" ref="password"/>
      <div className="signup-btn-wrapper">
        <p id="signup-switch">Have an account?</p><span onClick={this.login}>Login!</span>
      </div>
      <button type="submit" id="login-btn">login</button>
      </form>
    );
  }
})
