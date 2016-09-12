import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <nav>
        Home
        Today
        Important
        <Link to="/new-list">New</Link>
        Logout
      </nav>
    );
  }
});
