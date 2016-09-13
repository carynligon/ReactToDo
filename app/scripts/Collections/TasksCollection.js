import Backbone from 'backbone';

import Task from '../Models/TaskModel';

import settings from '../settings';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Tasks`,
  model: Task,
  newTask: function(task, listId) {
    this.create({
      task: task,
      list: {
        _type: 'KinveyRef',
        _id: listId,
        _collection: 'Lists'
      },
      listId: listId
    }, {
      success: (data) => {
        console.log(data);
      }
    });
  }
});
