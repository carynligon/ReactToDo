import Session from './Models/Session';
import ListsCollection from './Collections/ListsCollection';
import TasksCollection from './Collections/TasksCollection';

export default {
  session: new Session(),
  listsCollection: new ListsCollection(),
  tasksCollection: new TasksCollection()
};
