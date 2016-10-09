import React from 'react';

import Sidebar from './Sidebar';

export default React.createClass({
  getInitialState() {
    return {showSidebar: false}
  },
  showSidebar() {
    this.setState({showSidebar: !this.state.showSidebar})
    if (document.querySelector('.home-page-wrapper').style.transform = 'translateX(-290px)') {
      document.querySelector('.home-page-wrapper').style.transform = '';
    }
  },
  render() {
    let sidebar;
    if (this.state.showSidebar) {
      sidebar = <Sidebar/>
      console.dir(document.querySelector('main'));
      document.querySelector('.home-page-wrapper').style.transform = 'translateX(-290px)';
    }
    return (
      <nav>
        <span onClick={this.showSidebar}><i className="fa fa-bars" aria-hidden="true"></i></span>
        {sidebar}
      </nav>
    );
  }
});
