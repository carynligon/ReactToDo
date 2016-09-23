import React from 'react';

export default React.createClass({
  containerStyles: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    background: 'rgba(#000, 0.3)'
  },
  contentStyles: {
    position: 'relative',
    height: '50%',
    width: '50%'
  },
  render() {
    return (
      <div id="modal-container" style={this.containerStyles}>
        <div id="modal-content" style={this.contentStyles}>
        </div>
      </div>
    );
  }
})
