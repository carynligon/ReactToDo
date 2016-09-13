import _ from 'underscore';
import React from 'react';

import store from '../../store';

import Nav from '../Nav';


export default React.createClass({
  getInitialState() {
    return {}
  },
  createTask(e) {
    e.preventDefault();
    store.tasksCollection.newTask(this.refs.task.value, this.props.params.id)
  },
  getList() {
    this.setState({list: store.listsCollection.get(this.props.params.id).toJSON()})
  },
  updateTasks() {
    let tasks = _.where(store.tasksCollection.toJSON(), {listId: this.props.params.id});
    this.setState({tasks: tasks})
  },
  componentDidMount() {
    store.listsCollection.on('update', this.getList);
    store.tasksCollection.on('update', this.updateTasks);
    store.listsCollection.fetch();
    store.tasksCollection.fetch();
  },
  componentWillUnmount() {
    store.listsCollection.off('update', this.listener);
    store.tasksCollection.off('update', this.updateTasks);
  },
  render() {
    console.log(this.state);
    let name;
    let tasks;
    if (this.state.list) {
      name = this.state.list.name
    }
    if (this.state.tasks) {
      tasks = this.state.tasks.map((task,i) => {
        return (<li key={i} id={task._id}><p>{task.task}</p></li>);
      });
    }
    return (
      <main>
        <Nav/>
        <h2>{name}</h2>
        <form className="new-task-form" onSubmit={this.createTask}>
          <label htmlFor="task">Task</label>
          <input type="text" id="task" name="task" placeholder="Get haircut" ref="task"/>
          <button type="submit">+</button>
        </form>
        <ul id="task-list">
          {tasks}
        </ul>
      </main>
    );
  }
});
