import _ from 'underscore';
import React from 'react';

import store from '../../store';

import Nav from '../Nav';
import DatePicker from '../DatePicker';


export default React.createClass({
  getInitialState() {
    return {showOptions: false};
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
  showOptions() {
    this.setState({showOptions: !this.state.showOptions});
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
        return (<li key={i} id={task._id}><p>{task.task}</p></li>);
      });
    }
    if (this.state.showOptions) {
      form = (
        <form className="new-task-form" onSubmit={this.createTask}>
          <label htmlFor="task">Task</label>
          <input type="text" id="task" name="task" placeholder="Get haircut" ref="task"/>
          <label htmlFor="task">Due</label>
          <DatePicker date={momentPropTypes.momentObj}/>
          <label htmlFor="task">Priority</label>
          <select ref="priority">
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
      </main>
    );
  }
});
