import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';

import Nav from '../Nav';

export default React.createClass({
  createList(e) {
    e.preventDefault();
    let listName = this.refs.listName.value;
    store.listsCollection.create({
      name: listName
    }, {
      success: (data) => {
        console.log(data);
        hashHistory.push(`/list/${data.get('_id')}`)
      }
    })
  },
  render() {
    return (
      <main>
        <Nav/>
        <form className="new-list-form" onSubmit={this.createList}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="name" ref="listName"/>
          <button type="submit" id="submit-list" name="submit">+</button>
        </form>
      </main>
    );
  }
})
