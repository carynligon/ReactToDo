import React from 'react';
import {hashHistory, Link} from 'react-router';

import store from '../../store';

import Nav from '../Nav';
import Chart from '../Chart';

export default React.createClass({
  getInitialState() {
    return {}
  },
  listener() {
    this.setState({lists: store.listsCollection.toJSON()});
  },
  viewList(e) {
    hashHistory.push(`list/${e.target.parentNode.id}`)
  },
  componentDidMount() {
    store.listsCollection.on('update', this.listener);
    store.listsCollection.fetch();
  },
  componentWillUnmount() {
    store.listsCollection.off('update', this.listener);
  },
  render() {
    let lists;
    if (this.state.lists) {
      lists = this.state.lists.map((list,i) => {
        return (<li key={i} id={list._id} onClick={this.viewList}><h3>{list.name}</h3></li>)
      })
    }
    return (
      <main>
        <Nav/>
        <Link to="/new-list" id="goto-newlist"><i className="fa fa-plus" aria-hidden="true"></i></Link>
        <ul id="list-list">
          {lists}
        </ul>
        <Chart/>
      </main>
    );
  }
});
