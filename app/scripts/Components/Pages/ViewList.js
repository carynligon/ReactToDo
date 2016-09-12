import React from 'react';

import store from '../../store';

import Nav from '../Nav';


export default React.createClass({
  getInitialState() {
    return {}
  },
  listener() {
    this.setState({list: store.listsCollection.get(this.props.params.id).toJSON()})
  },
  componentDidMount() {
    store.listsCollection.on('update', this.listener);
    store.listsCollection.fetch();
  },
  componentWillUnmount() {
    store.listsCollection.off('update', this.listener);
  },
  render() {
    console.log(this.state);
    let name;
    if (this.state.list) {
      name = this.state.list.name
    }
    return (
      <main>
        <Nav/>
        <h2>{name}</h2>
      </main>
    );
  }
});
