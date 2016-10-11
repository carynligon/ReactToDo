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
    this.setState({tasks: tasks})
  },
  showOptions() {
    this.setState({showOptions: !this.state.showOptions});
  },
  completeTask(e) {
    console.log(e);
    let taskId = e.target.id;
    console.log(taskId);
    store.tasksCollection.completeTask(taskId);
  },
  componentDidMount() {
    store.listsCollection.on('update', this.getList);
    store.tasksCollection.on('update change', this.updateTasks);
    store.listsCollection.fetch();
    store.tasksCollection.fetch();
  },
  componentWillUnmount() {
    store.listsCollection.off('update', this.listener);
    store.tasksCollection.off('update change', this.updateTasks);
  },
  render() {
    let name;
    let tasks;
    let completedTasks;
    let form = (
      <form className="new-task-form" onSubmit={this.createTask}>
        <label htmlFor="task">Task</label>
        <input type="text" id="task" name="task" placeholder="Get haircut" ref="task"/>
        <button type="submit">+</button>
        <button id="more-options" onClick={this.showOptions}><i className="fa fa-bars" aria-hidden="true"></i></button>
      </form>
    );
    if (this.state.list) {
      name = this.state.list.name
    }
    if (this.state.tasks) {
      tasks = this.state.tasks.map((task,i) => {
        console.log(task);
        if (!task.completed) {
          return (
            <li key={i}>
              <p>{task.task}</p>
              <div className="checkbox-wrapper" role="checkbox" aria-checked={task.completed}>
                <div className="checkbox-box" aria-checked={task.completed} id={task._id} onClick={this.completeTask}>
                </div>
              </div>
            </li>
          );
        }
      });
      completedTasks = this.state.tasks.map((task,i) => {
        console.log(task);
        if (task.completed) {
          return (
            <li key={i}>
              <p>{task.task}</p>
              <div className="checkbox-wrapper" role="checkbox" aria-checked={task.completed}>
                <div className="checkbox-box" aria-checked={task.completed} id={task._id} onClick={this.completeTask}>
                </div>
              </div>
            </li>
          );
        }
      });
    }
    if (this.state.showOptions) {
      form = (
        <form className="new-task-form" onSubmit={this.createTask}>
          <label htmlFor="task">Task</label>
          <input type="text" id="task" name="task" placeholder="Get haircut" ref="task"/>
          <label htmlFor="date">Due</label>
          <input type="date" id="date" placeholder="01/01/20" ref="date"/>
          <label htmlFor="priority">Priority</label>
          <select ref="priority" id="priority">
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">!high!</option>
          </select>
          <button type="submit">+</button>
          <button id="more-options" onClick={this.showOptions}><i className="fa fa-bars" aria-hidden="true"></i></button>
        </form>
      )
    }
    return (
      <main>
        <Nav/>
        <h2>{name}</h2>
        {form}
        <ul id="task-list">
          {tasks}
        </ul>
        <h5>Completed Tasks</h5>
        <ul id="completed-task-list">
          {completedTasks}
        </ul>
      </main>
    );
  }
});
