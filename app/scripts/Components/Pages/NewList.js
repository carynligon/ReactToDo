import React from 'react';

import store from '../../store';

import Nav from '../Nav';

export default React.createClass({
  createList(e) {
    e.preventDefault();
    let listName = this.refs.listName.value;
    function createList() {
      let promise = new Promise((resolve, reject) => {
        store.listsCollection.newList(listName);
        resolve();
      });
      return promise;
    }
    createList().then(() => {
      return store.listsCollection ;
    }).then((list) => {
      console.log(list);
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
