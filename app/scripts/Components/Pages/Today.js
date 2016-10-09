import _ from 'underscore';
import React from 'react';

import store from '../../store';

import Nav from '../Nav';


export default React.createClass({
  getInitialState() {
    return {showOptions: false};
  },
  createTask(e) {
    e.preventDefault();
    store.tasksCollection.newTask(this.refs.task.value, this.refs.date.value, this.refs.priority.value, this.props.params.id)
  },
  getList() {
    this.setState({list: store.listsCollection.get(this.props.params.id).toJSON()})
  },
  updateTasks() {
    let tasks = _.where(store.tasksCollection.toJSON(), {listId: this.props.params.id});
    this.setState({tasks: store.tasksCollection.toJSON()})
  },
  showOptions() {
    this.setState({showOptions: !this.state.showOptions});
  },
  completeTask(e) {
    let taskId = e.target.id;
    store.tasksCollection.completeTask(taskId);
  },
  componentDidMount() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    console.log(today);
    store.tasksCollection.on('update change', this.updateTasks);
    store.tasksCollection.fetch({
      "data": {
        "query": JSON.stringify({"due": today})
      }
    });
  },
  componentWillUnmount() {
    store.tasksCollection.off('update', this.updateTasks);
  },
  render() {
    console.log(this.state);
    let tasks;
    if (this.state.list) {
      name = this.state.list.name
    }
    if (this.state.tasks) {
      tasks = this.state.tasks.map((task,i) => {
        return (
          <li key={i}>
            <p>{task.task}</p>
            <div className="checkbox-wrapper" role="checkbox" aria-checked={task.completed}>
              <div className="checkbox-box" aria-checked={task.completed} id={task._id} onClick={this.completeTask}>
              </div>
            </div>
          </li>
        );
      });
    }
    return (
      <main>
        <Nav/>
        <h2>{name}</h2>
        <ul id="task-list">
          {tasks}
        </ul>
      </main>
    );
  }
});
