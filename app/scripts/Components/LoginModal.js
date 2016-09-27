import React from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default React.createClass({
  getInitialState() {
    return {show: 'login'}
  },
  containerStyles: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    background: 'rgba(0,0,0,.5)'
  },
  contentStyles: {
    position: 'relative',
    height: '50%',
    width: '50%',
    background: '#168bbd',
    margin: '25% auto'
  },
  signup() {
    this.setState({show: 'signup'});
  },
  login() {
    this.setState({show: 'login'});
  },
  render() {
    let form;
    if (this.state.show === 'login') {
      form = <LoginForm hideModal={this.props.hideModal} showSignup={this.signup}/>
    } else {
      form = <SignupForm hideModal={this.props.hideModal} showLogin={this.login}/>
    }
    return (
      <div id="modal-container" style={this.containerStyles}>
        <div id="modal-content" style={this.contentStyles}>
        {form}
        </div>
      </div>
    );
  }
})
