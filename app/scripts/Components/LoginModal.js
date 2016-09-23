import React from 'react';

import LoginForm from './LoginForm';

export default React.createClass({
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
  render() {
    return (
      <div id="modal-container" style={this.containerStyles}>
        <div id="modal-content" style={this.contentStyles}>
          <LoginForm hideModal={this.props.hideModal}/>
        </div>
      </div>
    );
  }
})
