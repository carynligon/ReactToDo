import Session from './Models/Session';
import ListsCollection from './Collections/ListsCollection';
import TasksCollection from './Collections/TasksCollection';
import TodayTasks from './Collections/TodayTasks';
import ImportantTasks from './Collections/ImportantTasks';
import Users from './Collections/Users';

export default {
  session: new Session(),
  listsCollection: new ListsCollection(),
  tasksCollection: new TasksCollection(),
  todayTasks: new TodayTasks(),
  importantTasks: new ImportantTasks(),
  users: new Users()
};
