import React from 'react';

import Sidebar from './Sidebar';

export default React.createClass({
  getInitialState() {
    return {showSidebar: false}
  },
  showSidebar() {
    this.setState({showSidebar: !this.state.showSidebar})
  },
  render() {
    let sidebar;
    if (this.state.showSidebar) {
      sidebar = <Sidebar/>
    }
    return (
      <nav>
        <span onClick={this.showSidebar}><i className="fa fa-bars" aria-hidden="true"></i></span>
        {sidebar}
      </nav>
    );
  }
});
