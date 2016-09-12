import React from 'react';

import store from '../../store';

import Nav from '../Nav';


export default React.createClass({
  getInitialState() {
    return {}
  },
  listener() {
    this.setState({list: store.listsCollection.get(this.props.params.id)})
  },
  componentDidMount() {
    store.listsCollection.on('update', this.listener);
    store.listsCollection.fetch();
  },
  render() {
    console.log(this.props.params);
    console.log(this.state);
    return (
      <main>
        <Nav/>

      </main>
    );
  }
});
