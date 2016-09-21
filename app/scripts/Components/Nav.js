import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <a href="#">Today</a>
        <a href="#">Important</a>
        <a href="#">Logout</a>
      </nav>
    );
  }
});
